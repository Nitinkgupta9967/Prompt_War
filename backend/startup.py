import json
import os
from pathlib import Path
from database import engine, Base, AsyncSessionLocal
from models import ECIFaq, MisinfoKB, QuizQuestion

async def init_db():
    async with engine.begin() as conn:
        # Create tables
        await conn.run_sync(Base.metadata.create_all)

async def seed_data():
    data_dir = Path(__file__).parent / "data"
    async with AsyncSessionLocal() as db:
        # Seed FAQs
        if os.path.exists(data_dir / "eci_faq.json"):
            with open(data_dir / "eci_faq.json") as f:
                faqs = json.load(f)
                for item in faqs:
                    faq = ECIFaq(
                        question=item["question"],
                        answer=item["answer"],
                        category=item.get("category"),
                        language=item.get("language", "en"),
                        source=item.get("source")
                    )
                    db.add(faq)
        
        # Seed Misinfo
        if os.path.exists(data_dir / "misinfo_kb.json"):
            with open(data_dir / "misinfo_kb.json") as f:
                misinfo = json.load(f)
                for item in misinfo:
                    m = MisinfoKB(
                        claim=item["claim"],
                        verdict=item["verdict"],
                        explanation=item["explanation"],
                        source=item.get("source")
                    )
                    db.add(m)

        # Seed Quiz
        if os.path.exists(data_dir / "quiz_questions.json"):
            with open(data_dir / "quiz_questions.json") as f:
                questions = json.load(f)
                for item in questions:
                    q = QuizQuestion(
                        question=item["question"],
                        option_a=item["options"]["A"],
                        option_b=item["options"]["B"],
                        option_c=item["options"]["C"],
                        option_d=item["options"]["D"],
                        correct_option=item["correct"],
                        explanation=item.get("explanation"),
                        topic=item.get("topic")
                    )
                    db.add(q)
        
        await db.commit()

if __name__ == "__main__":
    import asyncio
    asyncio.run(init_db())
    asyncio.run(seed_data())
