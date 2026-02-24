from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = Field(None, max_length=64)

    @field_validator('message')
    @classmethod
    def no_empty(cls, v):
        if not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    model_used: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

    @field_validator('name', 'message')
    @classmethod
    def strip_fields(cls, v):
        return v.strip()


class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
