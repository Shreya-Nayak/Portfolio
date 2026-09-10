from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


ROOT_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    knowledge_dir: Path = ROOT_DIR / "knowledge"
    vector_store_dir: Path = ROOT_DIR / "backend" / "data" / "vector_store"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    default_top_k: int = 5
    llm_provider: str = "gemini"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.6-flash"
    retrieval_score_threshold: float = 0.35

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def resolved_knowledge_dir(self) -> Path:
        return self.knowledge_dir.resolve()

    def resolved_vector_store_dir(self) -> Path:
        return self.vector_store_dir.resolve()