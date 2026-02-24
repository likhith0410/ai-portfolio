import httpx
import re
import logging
from app.core.config import settings
from app.core.resume import get_system_prompt

logger = logging.getLogger(__name__)

FREE_MODELS = [
    "qwen/qwen3-coder:free",
    "openai/gpt-oss-20b:free",
    "stepfun/step-3.5-flash:free",
]
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def _clean(text: str) -> str:
    """Remove <think> tags some models include."""
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()


async def get_ai_response(message: str, history: list) -> tuple:
    """Returns (response_text, model_used)."""
    if not settings.openrouter_api_key or "xxx" in settings.openrouter_api_key:
        return (
            "Hi! The AI assistant isn't configured yet. "
            "Add a free OpenRouter API key to backend/.env to enable it.",
            "none",
        )

    system_prompt = get_system_prompt()
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history[-6:])
    messages.append({"role": "user", "content": message})

    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://likhith-portfolio.dev",
        "X-Title": "Likhith Gowda Portfolio",
    }

    for model in FREE_MODELS:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    OPENROUTER_URL,
                    json={"model": model, "messages": messages, "max_tokens": 400, "temperature": 0.7},
                    headers=headers,
                )
            if resp.status_code == 200:
                content = resp.json()["choices"][0]["message"]["content"]
                return _clean(content), model
            elif resp.status_code == 429:
                logger.warning(f"Rate limited on {model}, trying next...")
            else:
                logger.error(f"OpenRouter {resp.status_code} on {model}: {resp.text[:200]}")
        except httpx.TimeoutException:
            logger.error(f"Timeout: {model}")
        except Exception as e:
            logger.error(f"Error on {model}: {e}")

    return "I am having trouble connecting right now. Please try again in a moment!", "error"
