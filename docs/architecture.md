# Architecture

## Overview

This repository is a monorepo containing a Next.js frontend and a FastAPI backend, with a future grounded AI/RAG system layered on top of approved personal knowledge.

## Current Components

- Frontend: Next.js + React + TypeScript
- Backend: FastAPI + Python

## Future AI Architecture

- Gemini generation
- Qdrant vector retrieval
- Neo4j knowledge graph

These are planned but not implemented yet.

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
