from collections.abc import Callable
from pathlib import Path

from .embeddings import EmbeddingModel
from .store import VectorStore


class Retriever:
    def __init__(self, vector_store_dir: Path, embedding_model: str) -> None:
        self.store = VectorStore(vector_store_dir)
        self.embedder = EmbeddingModel(embedding_model)

    def retrieve(self, query: str, top_k: int = 5) -> list[dict]:
        query_embedding = self.embedder.encode([query])[0]
        return self.store.search(query_embedding, top_k)

    def close(self) -> None:
        self.store.close()


def retrieve(
    query: str,
    top_k: int = 5,
    vector_store_dir: Path | None = None,
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2",
    embedder_factory: Callable[[str], EmbeddingModel] = EmbeddingModel,
) -> list[dict]:
    if vector_store_dir is None:
        raise ValueError("vector_store_dir is required for retrieval")
    retriever = Retriever.__new__(Retriever)
    retriever.store = VectorStore(vector_store_dir)
    retriever.embedder = embedder_factory(embedding_model)
    try:
        return retriever.retrieve(query, top_k)
    finally:
        retriever.close()