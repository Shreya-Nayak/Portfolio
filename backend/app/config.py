from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    knowledge_dir: Path = ROOT_DIR / "knowledge"
    database_url: str = ""
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000,https://shreya-portfolio-bay-mu.vercel.app"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    default_top_k: int = 5
    llm_provider: str = "gemini"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.6-flash"
    retrieval_score_threshold: float = 0.50

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def resolved_knowledge_dir(self) -> Path:
        return self.knowledge_dir.resolve()

    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]