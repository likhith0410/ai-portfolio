# Likhith Gowda — AI Portfolio

A production-grade personal portfolio with a live AI chatbot powered by OpenRouter.

## Live Demo
- Frontend: https://likhith-portfolio.onrender.com
- Backend API: https://likhith-portfolio-api.onrender.com/api/docs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite + Framer Motion |
| Backend | Python FastAPI + SQLite |
| AI | OpenRouter (free LLMs — no credit card needed) |
| Security | Rate limiting, prompt injection blocking, CORS, security headers |
| Deployment | Render (backend) + Render Static (frontend) |

## Features
- Animated hero with typewriter effect
- Smooth scroll sections: About, Skills, Experience, Projects, Contact
- Live AI chatbot trained on resume data
- Contact form with SQLite storage
- Fully responsive dark editorial design
- Production security: rate limiting, input sanitization, JWT-ready

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
# Add your free OpenRouter key to .env
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Free OpenRouter API Key
1. Go to https://openrouter.ai
2. Sign up with Google or GitHub (no credit card)
3. Keys tab > Create Key
4. Paste into `backend/.env`

## Deployment on Render

### Backend
1. New Web Service > Connect GitHub repo
2. Root directory: `backend`
3. Build: `pip install -r requirements.txt`
4. Start: `gunicorn main:app -w 2 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
5. Add env vars: `OPENROUTER_API_KEY`, `ENVIRONMENT=production`, `ALLOWED_ORIGINS`

### Frontend
1. New Static Site > Connect GitHub repo
2. Root directory: `frontend`
3. Build: `npm install && npm run build`
4. Publish: `dist`
5. Add env var: `VITE_API_URL=https://your-backend.onrender.com`

## Project Structure
```
ai-portfolio/
├── backend/
│   ├── app/
│   │   ├── api/          # chat.py, contact.py, health.py
│   │   ├── core/         # config, security, database, resume
│   │   ├── models/       # pydantic schemas
│   │   └── services/     # ai_service.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Hero, About, Skills, Experience, Projects, Contact, ChatWidget
│   │   ├── hooks/        # useChat.ts
│   │   ├── services/     # api.ts
│   │   └── styles/       # globals.css
│   └── vite.config.ts
└── README.md
```

## Security
- Rate limiting: 20 requests/minute per IP
- Prompt injection detection and blocking
- Input sanitization (XSS, SQL injection patterns)
- CORS origin whitelist
- Security headers (X-Frame-Options, HSTS, CSP)
- IP hashing (no raw IPs stored in DB)

## Author
Likhith Gowda T R  
likhithgowda88923@gmail.com  
github.com/likhith0410
