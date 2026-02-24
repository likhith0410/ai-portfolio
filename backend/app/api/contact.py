from fastapi import APIRouter, Depends
from app.models.schemas import ContactRequest
from app.core.database import get_db
import aiosqlite
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["contact"])


def send_email_notification(name: str, email: str, message: str):
    """Send email to Likhith when someone fills the contact form."""
    if not settings.smtp_user or not settings.smtp_pass:
        logger.info("Email not configured - message saved to DB only")
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: Message from {name}"
        msg["From"] = settings.smtp_user
        msg["To"] = settings.notify_email or settings.smtp_user

        html = f"""
        <html><body style="font-family: sans-serif; background: #0a0a0f; color: #e8e8f0; padding: 2rem;">
          <div style="max-width: 600px; margin: 0 auto; background: #16161f; border-radius: 12px; padding: 2rem; border: 1px solid rgba(255,255,255,0.07);">
            <h2 style="color: #f59e0b; margin-bottom: 1rem;">New Portfolio Message</h2>
            <p><strong style="color: #f59e0b;">From:</strong> {name}</p>
            <p><strong style="color: #f59e0b;">Email:</strong> <a href="mailto:{email}" style="color: #f59e0b;">{email}</a></p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 1rem 0;">
            <p><strong style="color: #f59e0b;">Message:</strong></p>
            <p style="background: #1a1a24; padding: 1rem; border-radius: 8px; line-height: 1.7;">{message}</p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 1rem 0;">
            <p style="color: #5a5a7a; font-size: 0.85rem;">Sent from your AI Portfolio — ai-portfolio-rze9.vercel.app</p>
          </div>
        </body></html>
        """

        msg.attach(MIMEText(html, "html"))

        # Use port 587 with STARTTLS — works on Render (port 465 SSL is often blocked)
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(settings.smtp_user, settings.smtp_pass)
            server.send_message(msg)

        logger.info(f"Email notification sent for contact from {email}")

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP Authentication failed - check SMTP_USER and SMTP_PASS in environment variables")
    except smtplib.SMTPConnectError:
        logger.error("SMTP Connection failed - port 587 may be blocked on this server")
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")


@router.post("")
async def submit_contact(
    body: ContactRequest,
    db: aiosqlite.Connection = Depends(get_db),
):
    # Always save to database first
    await db.execute(
        "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)",
        (body.name, body.email, body.message),
    )
    await db.commit()
    logger.info(f"Contact form submission from {body.email}")

    # Send email notification (non-blocking)
    try:
        send_email_notification(body.name, body.email, body.message)
    except Exception as e:
        logger.error(f"Email notification error: {e}")

    return {"success": True, "message": "Message received! Likhith will get back to you soon."}