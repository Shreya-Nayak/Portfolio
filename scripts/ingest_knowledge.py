import argparse
import sys
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
BACKEND_DIR = ROOT_DIR / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from app.config import Settings  # noqa: E402
from app.knowledge.chunker import chunk_document  # noqa: E402
from app.knowledge.embeddings import EmbeddingModel  # noqa: E402
from app.knowledge.loader import load_markdown_documents  # noqa: E402
from app.knowledge.store import VectorStore  # noqa: E402


def ingest(force: bool = False) -> dict[str, int]:
    settings = Settings()
    documents = load_markdown_documents(settings.resolved_knowledge_dir())
    store = VectorStore(settings.database_url)
    changed_documents = [
        document
        for document in documents
        if force or store.source_hash(document.source) != document.content_hash
    ]
    removed_sources = {
        source
        for source in store.document_sources()
        if not (settings.resolved_knowledge_dir() / source).exists()
    }
    for source in removed_sources:
        store.remove_source(source)

    chunks = [chunk for document in changed_documents for chunk in chunk_document(document)]
    embeddings_generated = 0
    if chunks:
        embedder = EmbeddingModel(settings.embedding_model)
        embeddings = embedder.encode([chunk.text for chunk in chunks])
        for document in changed_documents:
            store.remove_source(document.source)
        store.add_chunks(chunks, embeddings)
        embeddings_generated = len(embeddings)
    for document in changed_documents:
        store.record_document(document.source, document.content_hash)

    indexed_count = store.count()
    store.close()
    return {
        "discovered": len(documents),
        "changed": len(changed_documents),
        "chunks": len(chunks),
        "embeddings": embeddings_generated,
        "indexed": indexed_count,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Index Markdown knowledge into the local vector store.")
    parser.add_argument("--force", action="store_true", help="Rebuild all document embeddings.")
    args = parser.parse_args()
    print("Knowledge ingestion started...\n")
    summary = ingest(force=args.force)
    print(f"Markdown files discovered: {summary['discovered']}")
    print(f"New/changed files: {summary['changed']}")
    print(f"Chunks created: {summary['chunks']}")
    print(f"Embeddings generated: {summary['embeddings']}")
    print(f"Chunks currently indexed: {summary['indexed']}\n")
    print("Knowledge ingestion completed successfully.")


if __name__ == "__main__":
    main()