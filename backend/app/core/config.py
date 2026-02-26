from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openrouter_api_key: str = ""
    gemini_api_key: str = ""
    allowed_origins: str = "http://localhost:3000"
    rate_limit: int = 20
    environment: str = "development"

    # Telegram notification (free - setup instructions in README)
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""

    # Admin secret to view contact submissions
    admin_secret: str = "changeme-set-this-in-env"

    model_config = {"env_file": ".env", "extra": "ignore"}

    @property
    def is_dev(self) -> bool:
        return self.environment.lower() == "development"

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
