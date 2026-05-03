# VoteSmart India

**VoteSmart India** is a comprehensive, AI-powered election guide designed to empower Indian voters for the 2024 General Elections. It provides verified information, real-time updates, and interactive tools to navigate the democratic process with clarity.

## 🚀 Features

- **🤖 AI Election Guide**: RAG-based chatbot grounded in official ECI data.
- **✅ Fact-Check Tool**: Instant verification of election-related claims and viral news.
- **🗳️ Voter Lookup**: Find your polling station and constituency details using your EPIC ID.
- **📅 Election Timeline**: Vertical roadmap of all 7 Lok Sabha phases.
- **🎓 Civic Quiz**: Interactive challenges to test and improve civic awareness.
- **📝 Voter Checklist**: Step-by-step guide to ensure you are ready for election day.
- **🌍 Multilingual**: Support for English and Hindi (foundation laid for Bhashini).

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI, SQLAlchemy, SQLite (local) / PostgreSQL (prod).
- **AI**: Claude 3 (Anthropic), RAG architecture.
- **DevOps**: Ready for Vercel and Railway.

## 🏃 Getting Started

### Backend Setup
1. `cd backend`
2. `python -m venv .venv`
3. `.\.venv\Scripts\activate`
4. `pip install -r requirements.txt`
5. `python startup.py` (Initialize & seed DB)
6. `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📄 Data Sources
All information is cross-referenced with official public data from the **Election Commission of India (ECI)**.

---
*Disclaimer: This is an independent electoral awareness initiative and is not officially affiliated with the Election Commission of India.*
