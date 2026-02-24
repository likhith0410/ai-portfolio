from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    openrouter_api_key: str = ""
    allowed_origins: str = "http://localhost:3000,http://localhost:5173"
    rate_limit: int = 20
    environment: str = "development"

    # Email notification settings (optional - set in .env to receive contact form emails)
    smtp_user: str = ""       # Your Gmail address
    smtp_pass: str = ""       # Gmail App Password (not your normal password)
    notify_email: str = ""    # Email to receive notifications (can be same as smtp_user)

    class Config:
        env_file = ".env"

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]


settings = Settings()
