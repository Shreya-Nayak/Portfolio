from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .assistant.providers import build_provider
from .assistant.service import AssistantService
from .config import Settings
from .knowledge.retriever import Retriever
from .knowledge.store import VectorStore


app = FastAPI(title="Portfolio API")
app.add_middleware(CORSMiddleware, allow_origins=Settings().cors_origin_list(), allow_methods=["GET", "POST"], allow_headers=["Content-Type"])


class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    top_k: int = Field(default=5, ge=1, le=20)


class ChatRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)


class KnowledgeService:
    def __init__(self) -> None:
        settings = Settings()
        self.retriever = Retriever(
            settings.database_url, settings.embedding_model
        )

    def retrieve(self, query: str, top_k: int) -> list[dict]:
        return self.retriever.retrieve(query, top_k)


knowledge_service: KnowledgeService | None = None
assistant_service: AssistantService | None = None


@app.get("/health")
async def health() -> dict[str, str]:
    settings = Settings()
    if not settings.database_url:
        return {"status": "ok", "database": "not_configured"}
    try:
        store = VectorStore(settings.database_url)
        store.close()
        return {"status": "ok", "database": "ok"}
    except RuntimeError:
        return {"status": "ok", "database": "unavailable"}


@app.post("/api/knowledge/search")
async def search_knowledge(request: SearchRequest) -> dict:
    global knowledge_service
    if knowledge_service is None:
        knowledge_service = KnowledgeService()
    return {"query": request.query, "results": knowledge_service.retriever.retrieve(request.query, request.top_k)}


def get_assistant_service() -> AssistantService:
    global assistant_service
    if assistant_service is None:
        settings = Settings()
        if not settings.gemini_api_key:
            raise HTTPException(
                status_code=503,
                detail="The grounded assistant is not configured with a Gemini API key.",
            )
        if knowledge_service is None:
            raise RuntimeError("Knowledge service was not initialized")
        assistant_service = AssistantService(
            provider=build_provider(
                settings.llm_provider,
                settings.gemini_api_key,
                settings.gemini_model,
            ),
            retrieve=knowledge_service.retrieve,
            top_k=settings.default_top_k,
            relevance_threshold=settings.retrieval_score_threshold,
        )
    return assistant_service


@app.post("/api/chat")
async def chat(request: ChatRequest) -> dict:
    global knowledge_service
    if not Settings().gemini_api_key:
        raise HTTPException(
            status_code=503,
            detail="The grounded assistant is not configured with a Gemini API key.",
        )
    if knowledge_service is None:
        knowledge_service = KnowledgeService()
    return get_assistant_service().answer(request.query)
