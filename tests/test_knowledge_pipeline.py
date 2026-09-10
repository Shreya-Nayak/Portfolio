import tempfile
import unittest
from pathlib import Path

from backend.app.knowledge.chunker import chunk_document
from backend.app.knowledge.loader import load_markdown_documents
from backend.app.knowledge.models import MarkdownDocument
from backend.app.knowledge.store import VectorStore


class KnowledgePipelineTests(unittest.TestCase):
    def test_discovers_nested_markdown_and_extracts_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "projects").mkdir()
            (root / "projects" / "demo.md").write_text("# Demo\n\nText", encoding="utf-8")
            documents = load_markdown_documents(root)

        self.assertEqual(len(documents), 1)
        self.assertEqual(documents[0].source, "projects/demo.md")
        self.assertEqual(documents[0].category, "projects")
        self.assertEqual(documents[0].title, "Demo")

    def test_chunks_follow_markdown_headings(self) -> None:
        document = MarkdownDocument("# Demo\n\nIntro\n\n## Details\n\nMore", "demo.md", "general", "demo.md", "Demo", "hash")
        chunks = chunk_document(document)

        self.assertEqual([chunk.title for chunk in chunks], ["Demo", "Details"])
        self.assertIn("More", chunks[1].text)

    def test_store_returns_most_similar_chunk(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            store = VectorStore(Path(directory))
            from backend.app.knowledge.models import KnowledgeChunk
            knowledge_chunks = [KnowledgeChunk("one", "one.md", "general", "One", 0, "one")]
            store.add_chunks(knowledge_chunks, [[1.0, 0.0]])
            results = store.search([0.9, 0.1], 1)
            store.close()

        self.assertEqual(results[0]["metadata"]["source"], "one.md")
        self.assertGreater(results[0]["similarity_score"], 0.8)

    def test_search_request_rejects_empty_query(self) -> None:
        from pydantic import ValidationError
        from backend.app.main import SearchRequest

        with self.assertRaises(ValidationError):
            SearchRequest(query="", top_k=5)


if __name__ == "__main__":
    unittest.main()