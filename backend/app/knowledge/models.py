from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class MarkdownDocument:
    text: str
    source: str
    category: str
    filename: str
    title: str
    content_hash: str


@dataclass(frozen=True)
class KnowledgeChunk:
    text: str
    source: str
    category: str
    title: str
    chunk_index: int
    content_hash: str

    def metadata(self) -> dict[str, Any]:
        return {
            "source": self.source,
            "category": self.category,
            "filename": self.source.rsplit("/", 1)[-1],
            "title": self.title,
            "chunk_index": self.chunk_index,
        }