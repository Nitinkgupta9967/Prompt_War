import os
import json
import google.generativeai as genai
from sqlalchemy.future import select
from models import ECIFaq, MisinfoKB
from database import AsyncSessionLocal
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-flash-latest')

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
    if not os.environ.get("GEMINI_API_KEY"):
        return f"Mock Response: {message}. Context: {context}"
    
    try:
        prompt = f"""You are VoteSmart AI, a helpful election guide for India. 
        Your goal is to provide accurate and official information about Indian elections.
        
        INSTRUCTIONS:
        1. Use the 'Context from ECI' below as your primary source of truth.
        2. If the context contains the answer, use it and cite the 'Source' if available.
        3. If the context does NOT contain the answer, use your general knowledge to answer helpfully, but clearly state that the user should verify details on the official ECI website (eci.gov.in).
        4. Always be neutral, non-partisan, and encouraging.
        5. Respond in the user's language.

        Context from ECI:
        {context}

        Question: {message}"""
        
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Error connecting to AI service (Gemini): {str(e)}"
