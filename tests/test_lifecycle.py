import os
import unittest
from unittest.mock import Mock, patch

from fastapi.testclient import TestClient


class LifecycleTests(unittest.TestCase):
    def test_lifespan_initializes_services_once_and_closes_retriever(self) -> None:
        os.environ["DATABASE_URL"] = "postgresql+psycopg://test"
        os.environ["GEMINI_API_KEY"] = "test-key"
        from backend.app import main

        fake_knowledge = Mock()
        fake_knowledge.retrieve.return_value = []
        fake_assistant = Mock()
        with patch.object(main, "KnowledgeService", return_value=fake_knowledge) as knowledge_factory, patch.object(
            main, "build_assistant_service", return_value=fake_assistant
        ) as assistant_factory:
            with TestClient(main.app) as client:
                knowledge_factory.assert_called_once()
                assistant_factory.assert_called_once()
                response = client.post(
                    "/api/knowledge/search", json={"query": "test", "top_k": 1}
                )
                self.assertEqual(response.status_code, 200)
                second_response = client.post(
                    "/api/knowledge/search", json={"query": "test again", "top_k": 1}
                )
                self.assertEqual(second_response.status_code, 200)
                knowledge_factory.assert_called_once()
            fake_knowledge.close.assert_called_once()

        os.environ.pop("DATABASE_URL", None)
        os.environ.pop("GEMINI_API_KEY", None)

    def test_search_does_not_construct_service_when_uninitialized(self) -> None:
        from backend.app import main

        previous = main.knowledge_service
        main.knowledge_service = None
        try:
            response = TestClient(main.app).post(
                "/api/knowledge/search", json={"query": "test", "top_k": 1}
            )
            self.assertEqual(response.status_code, 503)
        finally:
            main.knowledge_service = previous

    def test_health_does_not_initialize_embedding_model(self) -> None:
        from backend.app import main

        with patch.object(main, "Settings") as settings_factory, patch.object(
            main, "VectorStore"
        ) as store_factory, patch.object(main, "EmbeddingModel") as embedding_factory:
            settings_factory.return_value.database_url = "postgresql+psycopg://test"
            store_factory.return_value.ping.return_value = None
            response = TestClient(main.app).get("/health")

        self.assertEqual(response.status_code, 200)
        embedding_factory.assert_not_called()
        store_factory.return_value.close.assert_called_once()


if __name__ == "__main__":
    unittest.main()