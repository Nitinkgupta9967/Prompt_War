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
model = genai.GenerativeModel('gemini-1.5-flash')

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
        Use the provided context from the Election Commission of India (ECI) to answer user questions accurately. 
        If the answer is not in the context, say you don't know and advise checking the ECI website. 
        Respond in the user's language.

        Context from ECI:
        {context}

        Question: {message}"""
        
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Error connecting to AI service (Gemini): {str(e)}"
