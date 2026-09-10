from collections.abc import Sequence
from typing import Protocol


class LLMProvider(Protocol):
    def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Generate an answer from the supplied grounded prompt."""


class GeminiProvider:
    def __init__(self, api_key: str, model_name: str) -> None:
        if not api_key:
            raise ValueError("GEMINI_API_KEY is required for the Gemini provider")

        import google.generativeai as genai

        genai.configure(api_key=api_key)
        self._model = genai.GenerativeModel(model_name)

    def generate(self, system_prompt: str, user_prompt: str) -> str:
        response = self._model.generate_content(
            [
                {"role": "user", "parts": [system_prompt]},
                {"role": "user", "parts": [user_prompt]},
            ]
        )
        answer = getattr(response, "text", "").strip()
        if not answer:
            raise RuntimeError("The Gemini provider returned an empty answer")
        return answer


def build_provider(provider: str, api_key: str, model_name: str) -> LLMProvider:
    if provider.lower() == "gemini":
        return GeminiProvider(api_key, model_name)
    raise ValueError(f"Unsupported LLM provider: {provider}")