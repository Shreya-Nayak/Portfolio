import hashlib
from pathlib import Path

from .models import MarkdownDocument


def discover_markdown_files(knowledge_dir: Path) -> list[Path]:
    return sorted(
        path
        for path in knowledge_dir.rglob("*.md")
        if path.is_file()
    )


def _title_from_markdown(text: str, filename: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return Path(filename).stem.replace("-", " ").replace("_", " ").title()


def load_markdown_file(path: Path, knowledge_dir: Path) -> MarkdownDocument:
    text = path.read_text(encoding="utf-8")
    relative_path = path.relative_to(knowledge_dir).as_posix()
    parts = relative_path.split("/")
    category = parts[0] if len(parts) > 1 else "general"
    filename = parts[-1]

    return MarkdownDocument(
        text=text,
        source=relative_path,
        category=category,
        filename=filename,
        title=_title_from_markdown(text, filename),
        content_hash=hashlib.sha256(text.encode("utf-8")).hexdigest(),
    )


def load_markdown_documents(knowledge_dir: Path) -> list[MarkdownDocument]:
    return [
        load_markdown_file(path, knowledge_dir)
        for path in discover_markdown_files(knowledge_dir)
    ]