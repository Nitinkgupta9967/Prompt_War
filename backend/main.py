from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
import os
import uuid
from typing import List, Optional
from pydantic import BaseModel

from database import get_db
from models import ECIFaq, MisinfoKB, QuizQuestion, Constituency
from rag import search_faqs, search_misinfo, get_ai_response

app = FastAPI(title="VoteSmart India API")

# CORS
origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str
    language: str = "en"

class FactCheckRequest(BaseModel):
    claim: str

@app.get("/health")
async def health():
    return {"status": "ok", "service": "votesmart-india"}

@app.post("/api/chat")
async def chat(req: ChatRequest, db: AsyncSession = Depends(get_db)):
    # 1. Search Knowledge Base
    faqs = await search_faqs(req.message, db)
    context = "\n".join([f"Q: {f.question} A: {f.answer}" for f in faqs[:3]])
    
    # 2. Get AI Response
    response = await get_ai_response(req.message, context)
    
    return {
        "response": response,
        "sources": [{"question": f.question, "source": f.source} for f in faqs[:3]]
    }

@app.post("/api/factcheck")
async def factcheck(req: FactCheckRequest, db: AsyncSession = Depends(get_db)):
    results = await search_misinfo(req.claim, db)
    if not results:
        return {
            "verdict": "UNVERIFIED",
            "explanation": "No specific data found for this claim. We are investigating.",
            "source": "VoteSmart Database"
        }
    
    best_match = results[0]
    return {
        "verdict": best_match.verdict,
        "explanation": best_match.explanation,
        "source": best_match.source
    }

@app.get("/api/quiz/questions")
async def get_quiz(count: int = 10, db: AsyncSession = Depends(get_db)):
    stmt = select(QuizQuestion).limit(count)
    result = await db.execute(stmt)
    questions = result.scalars().all()
    return [{
        "id": str(q.id),
        "question": q.question,
        "options": {"A": q.option_a, "B": q.option_b, "C": q.option_c, "D": q.option_d},
        "topic": q.topic
    } for q in questions]

@app.get("/api/election/timeline")
async def get_timeline():
    # Mocked phases for 2024
    return [
      {"phase": 1, "date": "April 19, 2024", "status": "COMPLETED", "states": "Tamil Nadu, Rajasthan, etc."},
      {"phase": 2, "date": "April 26, 2024", "status": "COMPLETED", "states": "Kerala, Karnataka, etc."},
      {"phase": 3, "date": "May 7, 2024", "status": "COMPLETED", "states": "Gujarat, Maharashtra, etc."},
      {"phase": 4, "date": "May 13, 2024", "status": "UPCOMING", "states": "Andhra Pradesh, Telangana, etc."},
      {"phase": 5, "date": "May 20, 2024", "status": "SCHEDULED", "states": "Maharashtra, UP, etc."},
      {"phase": 6, "date": "May 25, 2024", "status": "SCHEDULED", "states": "Delhi, Haryana, etc."},
      {"phase": 7, "date": "June 1, 2024", "status": "SCHEDULED", "states": "UP, Punjab, etc."},
    ]

@app.post("/api/voter/lookup")
async def voter_lookup(req: dict):
    # Mocked response
    return {
        "name": "Rahul Sharma",
        "epic": req.get("epic", "ZKC0984532"),
        "constituency": "165 - Malviya Nagar",
        "polling_station": "Govt. Senior Secondary School, Block B",
        "address": "Room No. 4, Ground Floor, Sarvodaya Enclave, New Delhi - 110017"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
