# Knowledge Pipeline

The knowledge layer turns the approved Markdown files in `knowledge/` into a persistent PostgreSQL + pgvector index.

## Flow

`knowledge/**/*.md` is discovered recursively, loaded as UTF-8, split at Markdown headings, embedded with the local `sentence-transformers/all-MiniLM-L6-v2` model, and stored in PostgreSQL.

The `knowledge_chunks` table stores chunk text, JSON metadata, source hash, timestamps, and a `vector(384)` embedding. `knowledge_documents` stores one hash per source document for incremental ingestion. Cosine similarity is converted to `1 - cosine_distance`, preserving the existing relevance-score interpretation.

The application uses PostgreSQL with the pgvector extension because it provides durable relational storage and database-side vector similarity search without introducing a separate vector service.

## Incremental ingestion

The ingestion script hashes each Markdown file. Unchanged sources are skipped. New or changed sources are re-chunked and re-embedded, while deleted sources are removed from the store. Use `--force` to rebuild every source.

```powershell
docker run --name portfolio-postgres --env POSTGRES_PASSWORD=portfolio --env POSTGRES_DB=portfolio --publish 5432:5432 --detach pgvector/pgvector:pg17
Set-Location backend
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
Set-Location ..
..\backend\.venv\Scripts\python.exe scripts\ingest_knowledge.py
```

The first embedding run downloads the configured model into the local model cache. No paid embedding API is used. Set `DATABASE_URL=postgresql+psycopg://postgres:portfolio@localhost:5432/portfolio` in a local ignored `backend/.env` before ingesting.

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

The pgvector database must be populated before search results are available. The Markdown files remain the only source of personal information.
