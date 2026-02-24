import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.core.database import init_db
from app.api import chat, contact, health

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(name)s | %(message)s")
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address, default_limits=[f"{settings.rate_limit}/minute"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up - initializing database...")
    await init_db()
    logger.info("Database ready")
    yield
    logger.info("Shutting down...")


app = FastAPI(
    title="Likhith Gowda Portfolio API",
    version="1.0.0",
    docs_url="/api/docs" if settings.environment == "development" else None,
    redoc_url=None,
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if settings.environment == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


@app.middleware("http")
async def log_requests(request: Request, call_next):
    if not request.url.path.startswith("/health"):
        logger.info(f"{request.method} {request.url.path}")
    return await call_next(request)


app.include_router(health.router)
app.include_router(chat.router)
app.include_router(contact.router)


@app.get("/")
async def root():
    return {"message": "Likhith Gowda Portfolio API - see /api/docs"}
