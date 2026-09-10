import re

from .models import KnowledgeChunk, MarkdownDocument


_HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


def _sections(text: str, document_title: str) -> list[tuple[str, str]]:
    sections: list[tuple[str, list[str]]] = []
    current_title = document_title
    current_lines: list[str] = []

    for line in text.splitlines():
        match = _HEADING_RE.match(line)
        if match:
            if current_lines:
                sections.append((current_title, current_lines))
            current_title = match.group(2).strip()
            current_lines = []
        else:
            current_lines.append(line)

    if current_lines:
        sections.append((current_title, current_lines))

    return [
        (title, "\n".join(lines).strip())
        for title, lines in sections
        if "\n".join(lines).strip()
    ]


def chunk_document(document: MarkdownDocument) -> list[KnowledgeChunk]:
    chunks: list[KnowledgeChunk] = []
    for title, section_text in _sections(document.text, document.title):
        chunk_text = f"{title}\n\n{section_text}".strip()
        chunks.append(
            KnowledgeChunk(
                text=chunk_text,
                source=document.source,
                category=document.category,
                title=title,
                chunk_index=len(chunks),
                content_hash=document.content_hash,
            )
        )
    return chunks


def chunk_documents(documents: list[MarkdownDocument]) -> list[KnowledgeChunk]:
    chunks: list[KnowledgeChunk] = []
    for document in documents:
        chunks.extend(chunk_document(document))
    return chunks