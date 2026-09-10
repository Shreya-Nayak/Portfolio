import unittest
import os
from unittest.mock import Mock

from fastapi.testclient import TestClient

from backend.app import main
from backend.app.assistant.service import AssistantService, INSUFFICIENT_CONTEXT


def retrieval_result(text: str, score: float = 0.8) -> dict:
    return {
        "text": text,
        "metadata": {
            "source": "experience/wipro.md",
            "title": "GraphRAG Research and Development",
        },
        "similarity_score": score,
    }


class AssistantServiceTests(unittest.TestCase):
    def test_answers_from_retrieved_context(self) -> None:
        provider = Mock()
        provider.generate.return_value = "Shreya worked on GraphRAG-based test-case generation at Wipro."
        service = AssistantService(
            provider=provider,
            retrieve=Mock(return_value=[retrieval_result("Wipro GraphRAG test-case generation")]),
        )

        response = service.answer("What did Shreya work on at Wipro?")

        self.assertIn("GraphRAG", response["answer"])
        self.assertEqual(response["sources"][0]["metadata"]["source"], "experience/wipro.md")
        provider.generate.assert_called_once()

    def test_reports_missing_knowledge_without_calling_provider(self) -> None:
        provider = Mock()
        service = AssistantService(
            provider=provider,
            retrieve=Mock(return_value=[retrieval_result("Unrelated content", score=0.1)]),
        )

        response = service.answer("What is Shreya's phone number?")

        self.assertEqual(response["answer"], INSUFFICIENT_CONTEXT)
        self.assertEqual(response["sources"], [])
        provider.generate.assert_not_called()


class ChatApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.original_api_key = os.environ.get("GEMINI_API_KEY")
        os.environ["GEMINI_API_KEY"] = "test-key"
        self.original_knowledge_service = main.knowledge_service
        self.original_assistant_service = main.assistant_service
        main.knowledge_service = Mock()
        main.assistant_service = AssistantService(
            provider=Mock(generate=Mock(return_value="Grounded answer.")),
            retrieve=Mock(return_value=[retrieval_result("Grounded context")]),
        )
        self.client = TestClient(main.app)

    def tearDown(self) -> None:
        if self.original_api_key is None:
            os.environ.pop("GEMINI_API_KEY", None)
        else:
            os.environ["GEMINI_API_KEY"] = self.original_api_key
        main.knowledge_service = self.original_knowledge_service
        main.assistant_service = self.original_assistant_service

    def test_chat_returns_answer_and_sources(self) -> None:
        response = self.client.post("/api/chat", json={"query": "Tell me about Wipro."})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Grounded answer.")
        self.assertIn("sources", response.json())

    def test_chat_rejects_empty_input(self) -> None:
        response = self.client.post("/api/chat", json={"query": ""})

        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()