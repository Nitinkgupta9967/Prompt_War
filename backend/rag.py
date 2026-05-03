import os
import json
import anthropic
from sqlalchemy.future import select
from models import ECIFaq, MisinfoKB
from database import AsyncSessionLocal
from dotenv import load_dotenv

load_dotenv()

client = anthropic.AsyncAnthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

async def search_faqs(query: str, db):
    # Simple keyword search fallback for one-day sprint
    stmt = select(ECIFaq).where(ECIFaq.question.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def search_misinfo(query: str, db):
    stmt = select(MisinfoKB).where(MisinfoKB.claim.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_ai_response(message: str, context: str):
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return f"Mock Response: {message}. Context: {context}"
    
    try:
        response = await client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            temperature=0,
            system="You are VoteSmart AI, a helpful election guide for India. Use the provided context from the Election Commission of India (ECI) to answer user questions accurately. If the answer is not in the context, say you don't know and advise checking the ECI website. Respond in the user's language.",
            messages=[
                {"role": "user", "content": f"Context from ECI:\n{context}\n\nQuestion: {message}"}
            ]
        )
        return response.content[0].text
    except Exception as e:
        return f"Error connecting to AI service: {str(e)}"
