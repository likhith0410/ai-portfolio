import html
import logging
import httpx
from fastapi import APIRouter, Depends, HTTPException
import aiosqlite
from app.models.schemas import ContactRequest
from app.core.database import get_db
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["contact"])


async def _notify_telegram(name: str, email: str, message: str) -> None:
    """Send contact submission to your Telegram via free Bot API."""
    token = getattr(settings, "telegram_bot_token", "")
    chat_id = getattr(settings, "telegram_chat_id", "")
    if not token or not chat_id:
        return
    text = (
        f"New Portfolio Contact\n"
        f"From: {name}\n"
        f"Email: {email}\n"
        f"Message: {message[:500]}"
    )
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            await client.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": chat_id, "text": text},
            )
        logger.info("Telegram notification sent")
    except Exception as e:
        logger.warning("Telegram notification failed: %s", e)


@router.post("")
async def submit_contact(
    body: ContactRequest,
    db: aiosqlite.Connection = Depends(get_db),
):
    name    = html.escape(body.name[:100])
    message = html.escape(body.message[:2000])
    email   = str(body.email)

    # Spam protection
    async with db.execute(
        "SELECT id FROM contact_submissions "
        "WHERE email = ? AND datetime(created_at) > datetime('now','-60 seconds') LIMIT 1",
        (email,),
    ) as cur:
        if await cur.fetchone():
            raise HTTPException(status_code=429, detail="Please wait before submitting again.")

    await db.execute(
        "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)",
        (name, email, message),
    )
    await db.commit()
    logger.info("Contact form: %s <%s>", name, email)

    # Fire-and-forget Telegram notification (free, no SMTP needed)
    await _notify_telegram(name, email, message)

    return {"success": True, "message": "Message received! I will get back to you soon."}


@router.get("/submissions")
async def get_submissions(
    secret: str,
    db: aiosqlite.Connection = Depends(get_db),
):
    """Read all contact submissions. Protected by secret key."""
    if secret != getattr(settings, "admin_secret", "changeme"):
        raise HTTPException(status_code=403, detail="Forbidden")
    async with db.execute(
        "SELECT name, email, message, created_at FROM contact_submissions ORDER BY created_at DESC"
    ) as cur:
        rows = await cur.fetchall()
    return [dict(r) for r in rows]
