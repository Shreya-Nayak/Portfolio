import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from backend.app.knowledge.models import MarkdownDocument


class IngestionTests(unittest.TestCase):
    def setUp(self) -> None:
        import scripts.ingest_knowledge as ingestion
        self.ingestion = ingestion

    def test_changed_empty_document_removes_chunks_without_embedding(self) -> None:
        document = MarkdownDocument("", "experience/example.md", "experience", "example.md", "Example", "new-hash")
        settings = Mock()
        settings.database_url = "postgresql+psycopg://test"
        settings.embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
        settings.resolved_knowledge_dir.return_value = Path(".")
        store = Mock()
        store.source_hash.return_value = "old-hash"
        store.document_sources.return_value = set()
        store.count.return_value = 0

        with patch.object(self.ingestion, "Settings", return_value=settings), patch.object(
            self.ingestion, "load_markdown_documents", return_value=[document]
        ), patch.object(self.ingestion, "VectorStore", return_value=store), patch.object(
            self.ingestion, "chunk_document", return_value=[]
        ), patch.object(self.ingestion, "EmbeddingModel") as embedding_factory:
            summary = self.ingestion.ingest()

        store.remove_source.assert_called_once_with(document.source)
        store.record_document.assert_called_once_with(document.source, document.content_hash)
        embedding_factory.assert_not_called()
        self.assertEqual(summary["embeddings"], 0)

    def test_unchanged_document_skips_embedding(self) -> None:
        document = MarkdownDocument("content", "profile.md", "general", "profile.md", "Profile", "same-hash")
        settings = Mock()
        settings.database_url = "postgresql+psycopg://test"
        settings.resolved_knowledge_dir.return_value = Path(".")
        store = Mock()
        store.source_hash.return_value = document.content_hash
        store.document_sources.return_value = {document.source}
        store.count.return_value = 1

        with patch.object(self.ingestion, "Settings", return_value=settings), patch.object(
            self.ingestion, "load_markdown_documents", return_value=[document]
        ), patch.object(self.ingestion, "VectorStore", return_value=store), patch.object(
            self.ingestion, "EmbeddingModel"
        ) as embedding_factory:
            summary = self.ingestion.ingest()

        store.remove_source.assert_not_called()
        store.record_document.assert_not_called()
        embedding_factory.assert_not_called()
        self.assertEqual(summary["changed"], 0)


if __name__ == "__main__":
    unittest.main()