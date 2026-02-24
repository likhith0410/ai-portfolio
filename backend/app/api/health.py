from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.core.config import settings

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(status="ok", version="1.0.0", environment=settings.environment)
