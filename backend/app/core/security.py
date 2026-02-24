import re
import html

MAX_MESSAGE_LENGTH = 1000
BLOCKED_PATTERNS = [
    r"(?i)(ignore|forget|disregard)\s+(previous|all|above|prior)\s+(instructions?|prompts?|context)",
    r"(?i)you\s+are\s+now\s+(?:a\s+)?(?:different|new|another)",
    r"(?i)act\s+as\s+(?:if\s+you\s+are\s+)?(?:an?\s+)?(?:evil|malicious|unrestricted)",
    r"(?i)jailbreak",
    r"(?i)system\s*prompt",
    r"<script.*?>",
    r"javascript:",
    r"(?i)drop\s+table",
    r"(?i)delete\s+from",
    r"(?i)union\s+select",
]


def sanitize_input(text: str) -> tuple[str, bool]:
    """Returns (cleaned_text, is_safe). If not safe, reject the request."""
    if not text or len(text.strip()) == 0:
        return "", False
    if len(text) > MAX_MESSAGE_LENGTH:
        text = text[:MAX_MESSAGE_LENGTH]
    text = html.escape(text)
    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, text):
            return "", False
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return text.strip(), True
