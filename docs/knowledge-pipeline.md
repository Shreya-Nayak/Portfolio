# Knowledge Pipeline

Phase D turns the approved Markdown files in `knowledge/` into a local searchable index.

## Flow

`knowledge/**/*.md` is discovered recursively, loaded as UTF-8, split at Markdown headings, embedded with the configured local Sentence Transformer, and stored in `backend/data/vector_store/knowledge.sqlite3`.

Each stored row contains the chunk text, normalized embedding, source path, category, title, chunk index, and source content hash. The SQLite store is intentionally small and transparent for this portfolio project; generated files are ignored by Git.

## Incremental ingestion

The ingestion script hashes each Markdown file. Unchanged sources are skipped. New or changed sources are re-chunked and re-embedded, while deleted sources are removed from the store. Use `--force` to rebuild every source.

```powershell
Set-Location backend
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
Set-Location ..
..\backend\.venv\Scripts\python.exe scripts\ingest_knowledge.py
..\backend\.venv\Scripts\python.exe scripts\ingest_knowledge.py --force
```

The first embedding run downloads the configured model into the local model cache. No paid embedding API is used.

## Backend and search

Start the API from the repository root:

```powershell
backend\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload
```

The existing health check remains available at `GET /health`. Search uses an embedding for the query and returns the highest cosine-similarity chunks without calling an LLM:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:8000/api/knowledge/search `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"query":"What projects has Shreya worked on?","top_k":5}'
```

The vector store must be populated before search results are available. The Markdown files remain the only source of personal information.
