import json
import math
import sqlite3
from pathlib import Path
from typing import Any

from .models import KnowledgeChunk


class VectorStore:
    def __init__(self, directory: Path) -> None:
        directory.mkdir(parents=True, exist_ok=True)
        self.database_path = directory / "knowledge.sqlite3"
        self.connection = sqlite3.connect(self.database_path)
        self.connection.row_factory = sqlite3.Row
        self.connection.execute(
            """
            CREATE TABLE IF NOT EXISTS chunks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source TEXT NOT NULL,
                content_hash TEXT NOT NULL,
                chunk_index INTEGER NOT NULL,
                text TEXT NOT NULL,
                metadata TEXT NOT NULL,
                embedding TEXT NOT NULL,
                UNIQUE(source, chunk_index)
            )
            """
        )
        self.connection.execute(
            """
            CREATE TABLE IF NOT EXISTS documents (
                source TEXT PRIMARY KEY,
                content_hash TEXT NOT NULL
            )
            """
        )
        self.connection.execute(
            "CREATE INDEX IF NOT EXISTS idx_chunks_source ON chunks(source)"
        )
        self.connection.commit()

    def close(self) -> None:
        self.connection.close()

    def source_hash(self, source: str) -> str | None:
        row = self.connection.execute(
            "SELECT content_hash FROM documents WHERE source = ?", (source,)
        ).fetchone()
        return row["content_hash"] if row else None

    def document_sources(self) -> set[str]:
        return {
            row["source"]
            for row in self.connection.execute("SELECT source FROM documents")
        }

    def record_document(self, source: str, content_hash: str) -> None:
        self.connection.execute(
            """
            INSERT INTO documents (source, content_hash)
            VALUES (?, ?)
            ON CONFLICT(source) DO UPDATE SET content_hash = excluded.content_hash
            """,
            (source, content_hash),
        )

    def remove_source(self, source: str) -> None:
        self.connection.execute("DELETE FROM chunks WHERE source = ?", (source,))
        self.connection.execute("DELETE FROM documents WHERE source = ?", (source,))

    def add_chunks(
        self, chunks: list[KnowledgeChunk], embeddings: list[list[float]]
    ) -> None:
        self.connection.executemany(
            """
            INSERT INTO chunks
                (source, content_hash, chunk_index, text, metadata, embedding)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            [
                (
                    chunk.source,
                    chunk.content_hash,
                    chunk.chunk_index,
                    chunk.text,
                    json.dumps(chunk.metadata()),
                    json.dumps(embedding),
                )
                for chunk, embedding in zip(chunks, embeddings, strict=True)
            ],
        )
        self.connection.commit()

    def search(self, embedding: list[float], top_k: int) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []
        for row in self.connection.execute(
            "SELECT text, metadata, embedding FROM chunks"
        ):
            stored = json.loads(row["embedding"])
            score = sum(left * right for left, right in zip(embedding, stored))
            if not math.isfinite(score):
                continue
            results.append(
                {
                    "text": row["text"],
                    "metadata": json.loads(row["metadata"]),
                    "similarity_score": score,
                }
            )
        return sorted(
            results, key=lambda result: result["similarity_score"], reverse=True
        )[:top_k]

    def count(self) -> int:
        return int(self.connection.execute("SELECT COUNT(*) FROM chunks").fetchone()[0])