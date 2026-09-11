from collections.abc import Callable

from .embeddings import EmbeddingModel
from .store import VectorStore


class Retriever:
    def __init__(self, database_url: str, embedding_model: str) -> None:
        self.store = VectorStore(database_url)
        self.embedder = EmbeddingModel(embedding_model)

    def retrieve(self, query: str, top_k: int = 5) -> list[dict]:
        query_embedding = self.embedder.encode([query])[0]
        return self.store.search(query_embedding, top_k)

    def close(self) -> None:
        self.store.close()


def retrieve(
    query: str,
    top_k: int = 5,
    database_url: str | None = None,
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2",
    embedder_factory: Callable[[str], EmbeddingModel] = EmbeddingModel,
) -> list[dict]:
    if database_url is None:
        raise ValueError("database_url is required for retrieval")
    retriever = Retriever.__new__(Retriever)
    retriever.store = VectorStore(database_url)
    retriever.embedder = embedder_factory(embedding_model)
    try:
        return retriever.retrieve(query, top_k)
    finally:
        retriever.close()