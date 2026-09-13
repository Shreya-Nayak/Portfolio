from __future__ import annotations

from datetime import datetime
from typing import Any

from pgvector.sqlalchemy import Vector
from sqlalchemy import DateTime, Integer, String, Text, UniqueConstraint, create_engine, func, select, text
from sqlalchemy.dialects.postgresql import JSONB, insert
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

from .models import KnowledgeChunk

EMBEDDING_DIMENSION = 384


class Base(DeclarativeBase):
    pass


class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    source: Mapped[str] = mapped_column(String(512), primary_key=True)
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class KnowledgeChunkRow(Base):
    __tablename__ = "knowledge_chunks"
    __table_args__ = (UniqueConstraint("source", "chunk_index", name="uq_knowledge_source_chunk"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source: Mapped[str] = mapped_column(String(512), nullable=False, index=True)
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column("metadata", JSONB, nullable=False)
    source_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    embedding: Mapped[list[float]] = mapped_column(Vector(EMBEDDING_DIMENSION), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class VectorStore:
    """Persistent PostgreSQL + pgvector store for grounded knowledge chunks."""

    def __init__(self, database_url: str, initialize_schema: bool = False) -> None:
        if not database_url:
            raise RuntimeError("DATABASE_URL is required for PostgreSQL knowledge storage")
        if database_url.startswith("postgresql://"):
            database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
        self.engine: Engine = create_engine(database_url, pool_pre_ping=True, pool_recycle=1800)
        self.session_factory = sessionmaker(self.engine, expire_on_commit=False)
        try:
            self.ping()
            if initialize_schema:
                self.initialize_schema()
        except Exception as error:
            self.close()
            raise RuntimeError(
                "Could not initialize PostgreSQL/pgvector. Check DATABASE_URL and ensure pgvector is available."
            ) from error

    def ping(self) -> None:
        with self.engine.connect() as connection:
            connection.execute(text("SELECT 1"))

    def initialize_schema(self) -> None:
        with self.engine.begin() as connection:
            connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        Base.metadata.create_all(self.engine)
        self._ensure_vector_index()

    def _ensure_vector_index(self) -> None:
        with self.engine.begin() as connection:
            connection.execute(
                text(
                    """
                    CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_hnsw
                    ON knowledge_chunks USING hnsw (embedding vector_cosine_ops)
                    """
                )
            )

    def close(self) -> None:
        self.engine.dispose()

    def source_hash(self, source: str) -> str | None:
        with self.session_factory() as session:
            document = session.get(KnowledgeDocument, source)
            return document.content_hash if document else None

    def document_sources(self) -> set[str]:
        with self.session_factory() as session:
            return set(session.scalars(select(KnowledgeDocument.source)).all())

    def record_document(self, source: str, content_hash: str) -> None:
        with self.session_factory.begin() as session:
            statement = insert(KnowledgeDocument).values(source=source, content_hash=content_hash)
            session.execute(statement.on_conflict_do_update(
                index_elements=[KnowledgeDocument.source],
                set_={"content_hash": statement.excluded.content_hash, "updated_at": func.now()},
            ))

    def remove_source(self, source: str) -> None:
        with self.session_factory.begin() as session:
            session.query(KnowledgeChunkRow).filter_by(source=source).delete()
            session.query(KnowledgeDocument).filter_by(source=source).delete()

    def add_chunks(self, chunks: list[KnowledgeChunk], embeddings: list[list[float]]) -> None:
        if any(len(embedding) != EMBEDDING_DIMENSION for embedding in embeddings):
            raise ValueError(f"Every embedding must have dimension {EMBEDDING_DIMENSION}")
        with self.session_factory.begin() as session:
            session.add_all([
                KnowledgeChunkRow(
                    source=chunk.source,
                    chunk_index=chunk.chunk_index,
                    content=chunk.text,
                    metadata_json=chunk.metadata(),
                    source_hash=chunk.content_hash,
                    embedding=embedding,
                )
                for chunk, embedding in zip(chunks, embeddings, strict=True)
            ])

    def search(self, embedding: list[float], top_k: int) -> list[dict[str, Any]]:
        if len(embedding) != EMBEDDING_DIMENSION:
            raise ValueError(f"Query embedding must have dimension {EMBEDDING_DIMENSION}")
        distance = KnowledgeChunkRow.embedding.cosine_distance(embedding)
        statement = (
            select(KnowledgeChunkRow.content, KnowledgeChunkRow.metadata_json, distance.label("distance"))
            .order_by(distance)
            .limit(top_k)
        )
        with self.session_factory() as session:
            rows = session.execute(statement).all()
        return [
            {
                "text": row.content,
                "metadata": row.metadata_json,
                "similarity_score": max(0.0, 1.0 - float(row.distance)),
            }
            for row in rows
        ]

    def count(self) -> int:
        with self.session_factory() as session:
            return session.query(KnowledgeChunkRow).count()
