# Architecture

## Overview

This repository is a monorepo containing a Next.js frontend and a FastAPI backend, with a grounded AI/RAG system layered on top of approved personal knowledge.

## Current Components

- Frontend: Next.js + React + TypeScript
- Backend: FastAPI + Python

## Current AI Architecture

- Sentence Transformers (`all-MiniLM-L6-v2`) embeddings
- PostgreSQL with the pgvector extension for persistent vector storage and cosine retrieval
- Gemini generation over retrieved Markdown context

Qdrant and Neo4j are not used by this application. They may appear in the approved professional experience knowledge as technologies from Shreya's Wipro work, but they are not part of this portfolio runtime.

## Knowledge

The knowledge base will be human-authored Markdown files that contain only explicitly approved personal information.

## Repository Structure

```
Portfolio/
├── .env.example
├── .gitignore
├── README.md
├── backend/
├── docs/
├── frontend/
├── knowledge/
├── scripts/
└── tests/
```

## Development Principle

The project is built incrementally. Frontend, backend, retrieval, graph, and AI functionality are implemented as separate milestones.
