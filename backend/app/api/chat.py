from fastapi import APIRouter, Request, HTTPException, Depends
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import get_ai_response
from app.core.security import sanitize_input
from app.core.database import get_db
import aiosqlite, uuid, hashlib, logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/chat", tags=["chat"])


def _hash_ip(ip: str) -> str:
    return hashlib.sha256(ip.encode()).hexdigest()[:16]


@router.post("", response_model=ChatResponse)
async def chat(request: Request, body: ChatRequest, db: aiosqlite.Connection = Depends(get_db)):
    clean_msg, is_safe = sanitize_input(body.message)
    if not is_safe:
        raise HTTPException(status_code=400, detail="Invalid or unsafe message content.")

    ip_hash = _hash_ip(request.client.host if request.client else "unknown")
    session_id = body.session_id

    if not session_id or len(session_id) != 36:
        session_id = str(uuid.uuid4())
        await db.execute("INSERT INTO chat_sessions (id, ip_hash) VALUES (?, ?)", (session_id, ip_hash))
        await db.commit()

    async with db.execute(
        "SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at DESC LIMIT 6",
        (session_id,),
    ) as cursor:
        rows = await cursor.fetchall()
    history = [{"role": r[0], "content": r[1]} for r in reversed(rows)]

    reply, model_used = await get_ai_response(clean_msg, history)

    await db.execute("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)", (session_id, "user", clean_msg))
    await db.execute("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)", (session_id, "assistant", reply))
    await db.commit()

    return ChatResponse(reply=reply, session_id=session_id, model_used=model_used)
