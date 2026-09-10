# Interactive AI Portfolio

This repository contains a personal portfolio website with a grounded AI assistant that will answer questions about the owner using only an approved personal knowledge base.

Current foundation:

- Next.js frontend
- FastAPI backend
- isolated backend virtual environment in `backend/.venv`

Planned later stages:

- RAG retrieval with Qdrant
- knowledge graph support with Neo4j
- Gemini-powered grounded generation

The AI layer is not implemented yet.

## Local Development

Frontend:

```powershell
Set-Location frontend
pnpm install
pnpm dev
```

Frontend checks:

```powershell
Set-Location frontend
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Backend:

```powershell
Set-Location backend
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Backend tests, when added:

```powershell
Set-Location backend
..\.venv\Scripts\python.exe -m pytest
```
