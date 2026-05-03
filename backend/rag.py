import os
import json
import aiohttp
from sqlalchemy.future import select
from models import ECIFaq, MisinfoKB
from database import AsyncSessionLocal
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")

async def search_faqs(query: str, db):
    # Simple keyword search fallback
    stmt = select(ECIFaq).where(ECIFaq.question.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def search_misinfo(query: str, db):
    stmt = select(MisinfoKB).where(MisinfoKB.claim.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_ai_response(message: str, context: str):
    if not OPENROUTER_API_KEY:
        return f"Mock Response: {message}. Context: {context}"
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:3000", # Optional, for OpenRouter rankings
        "X-Title": "VoteSmart India", # Optional
        "Content-Type": "application/json"
    }
    
    system_prompt = """You are VoteSmart AI, a helpful election guide for India. 
    Your goal is to provide accurate and official information about Indian elections.
    
    INSTRUCTIONS:
    1. Use the 'Context from ECI' below as your primary source of truth.
    2. If the context contains the answer, use it and cite the 'Source' if available.
    3. If the context does NOT contain the answer, use your general knowledge to answer helpfully, but clearly state that the user should verify details on the official ECI website (eci.gov.in).
    4. Always be neutral, non-partisan, and encouraging.
    5. Respond in the user's language."""

    data = {
        "model": "google/gemini-2.0-flash-exp:free", # Using a highly capable free model
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context from ECI:\n{context}\n\nQuestion: {message}"}
        ]
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result['choices'][0]['message']['content']
                else:
                    error_text = await response.text()
                    return f"Error from OpenRouter: {response.status} - {error_text}"
    except Exception as e:
        return f"Error connecting to AI service (OpenRouter): {str(e)}"
