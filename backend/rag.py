import os
import json
import asyncio
from openai import AsyncOpenAI
import anthropic
from sqlalchemy.future import select
from models import ECIFaq, MisinfoKB
from database import AsyncSessionLocal
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# Clients
or_client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "VoteSmart India",
    }
) if OPENROUTER_API_KEY else None

ant_client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

async def search_faqs(query: str, db):
    stmt = select(ECIFaq).where(ECIFaq.question.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def search_misinfo(query: str, db):
    stmt = select(MisinfoKB).where(MisinfoKB.claim.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_ai_response(message: str, context: str):
    system_prompt = """You are VoteSmart AI, a helpful election guide for India. 
    Use the provided context from the ECI to answer questions. If not in context, use general knowledge but advise verifying on eci.gov.in."""

    # 1. Try OpenRouter
    if or_client:
        # Try a few free models in order of capability
        models_to_try = [
            "google/gemini-2.0-flash-exp:free",
            "meta-llama/llama-3.1-8b-instruct:free",
            "mistralai/mistral-7b-instruct:free"
        ]
        
        for model in models_to_try:
            try:
                completion = await or_client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {message}"}
                    ],
                    timeout=10
                )
                return completion.choices[0].message.content
            except Exception as e:
                print(f"OpenRouter {model} failed: {str(e)}")

    # 2. Try Anthropic direct
    if ant_client:
        models_to_try = ["claude-3-5-sonnet-20240620", "claude-3-haiku-20240307", "claude-2.1"]
        for model in models_to_try:
            try:
                response = await ant_client.messages.create(
                    model=model,
                    max_tokens=1000,
                    system=system_prompt,
                    messages=[{"role": "user", "content": f"Context:\n{context}\n\nQuestion: {message}"}]
                )
                return response.content[0].text
            except Exception as e:
                print(f"Anthropic {model} failed: {str(e)}")

    return "All AI services failed. Please try again later."
