# Likhith Gowda T R — AI Portfolio

A production-grade personal portfolio with a live AI chatbot powered by OpenRouter.

## Live Demo

- **Portfolio:** https://ai-portfolio-rze9.vercel.app
- **Backend API:** https://ai-portfolio-hr2f.onrender.com/api/docs

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Framer Motion (animations)
- Vite (build tool)

**Backend**
- Python FastAPI
- SQLite + aiosqlite
- OpenRouter API (free AI models)

**DevOps**
- Frontend hosted on Vercel
- Backend hosted on Render
- GitHub Actions ready

## Features

- AI chatbot that answers questions about my skills and experience
- Contact form with email notifications
- Fully responsive (mobile + desktop)
- Rate limiting and input sanitization
- Lazy loaded components for fast performance

## Local Setup

**Backend:**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Add your free OpenRouter API key to `backend/.env`:
```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```
Get a free key at https://openrouter.ai — no credit card needed.