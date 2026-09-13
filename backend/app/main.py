from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .assistant.providers import build_provider
from .assistant.service import AssistantService
from .config import Settings
from .knowledge.retriever import Retriever
from .knowledge.store import VectorStore
from .knowledge.embeddings import EmbeddingModel


logger = logging.getLogger("portfolio.api")


@asynccontextmanager
async def lifespan(application: FastAPI):
    global knowledge_service, assistant_service
    settings = Settings()
    logger.info("[startup] Portfolio API lifespan starting")
    if settings.database_url:
        try:
            knowledge_service = KnowledgeService()
            logger.info("[startup] Retriever and embedding model initialized")
            if settings.gemini_api_key:
                assistant_service = build_assistant_service(settings, knowledge_service)
                logger.info("[startup] Assistant provider initialized")
        except Exception:
            logger.exception("[startup] RAG initialization failed")
            knowledge_service = None
            assistant_service = None
            raise
    else:
        logger.warning("[startup] DATABASE_URL is not configured; RAG endpoints are unavailable")
    try:
        yield
    finally:
        logger.info("[shutdown] Portfolio API shutting down")
        if knowledge_service is not None:
            knowledge_service.close()
        knowledge_service = None
        assistant_service = None
        logger.info("[shutdown] Database and RAG resources released")


app = FastAPI(title="Portfolio API", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=Settings().cors_origin_list(), allow_methods=["GET", "POST"], allow_headers=["Content-Type"])


class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    top_k: int = Field(default=5, ge=1, le=20)


class ChatRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)


class KnowledgeService:
    def __init__(self) -> None:
        settings = Settings()
        logger.info("[startup] Initializing VectorStore connection")
        store = VectorStore(settings.database_url)
        try:
            logger.info("[startup] Loading embedding model: %s", settings.embedding_model)
            embedder = EmbeddingModel(settings.embedding_model)
            logger.info("[startup] Embedding model loaded")
        except Exception:
            store.close()
            raise
        self.retriever = Retriever(store, embedder)
        logger.info("[startup] Retriever ready")

    def retrieve(self, query: str, top_k: int) -> list[dict]:
        return self.retriever.retrieve(query, top_k)

    def close(self) -> None:
        self.retriever.close()


knowledge_service: KnowledgeService | None = None
assistant_service: AssistantService | None = None


def build_assistant_service(settings: Settings, service: KnowledgeService) -> AssistantService:
    return AssistantService(
        provider=build_provider(
            settings.llm_provider,
            settings.gemini_api_key,
            settings.gemini_model,
        ),
        retrieve=service.retrieve,
        top_k=settings.default_top_k,
        relevance_threshold=settings.retrieval_score_threshold,
    )


@app.get("/health")
def health() -> dict[str, str]:
    settings = Settings()
    if not settings.database_url:
        return {"status": "ok", "database": "not_configured"}
    try:
        store = VectorStore(settings.database_url)
        store.ping()
        store.close()
        return {"status": "ok", "database": "ok"}
    except RuntimeError:
        return {"status": "ok", "database": "unavailable"}


@app.post("/api/knowledge/search")
def search_knowledge(request: SearchRequest) -> dict:
    if knowledge_service is None:
        raise HTTPException(status_code=503, detail="The knowledge service is not initialized.")
    return {"query": request.query, "results": knowledge_service.retrieve(request.query, request.top_k)}


def get_assistant_service() -> AssistantService:
    global assistant_service
    if assistant_service is None:
        raise HTTPException(status_code=503, detail="The grounded assistant is not initialized.")
    return assistant_service


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict:
    if knowledge_service is None:
        raise HTTPException(status_code=503, detail="The knowledge service is not initialized.")
    return get_assistant_service().answer(request.query)
