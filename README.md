# 🇮🇳 VoteSmart India — AI-Powered Electoral Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![AI-Powered](https://img.shields.io/badge/AI-Powered-blueviolet)](https://openrouter.ai/)

**VoteSmart India** is a premium, AI-driven platform designed to empower Indian citizens with accurate, official, and accessible electoral information. It combines real-time AI assistance with verified ECI data to combat misinformation and promote civic awareness.

### 🚀 **Live Demo**: [votesmart-web-99378412040.europe-west1.run.app](https://votesmart-web-99378412040.europe-west1.run.app)

---

## 📸 Screenshots

| Homepage | AI Chat Assistant |
| :---: | :---: |
| ![Homepage](https://raw.githubusercontent.com/Nitinkgupta9967/Prompt_War/main/screenshots/home.png) | ![Chat](https://raw.githubusercontent.com/Nitinkgupta9967/Prompt_War/main/screenshots/chat.png) |

| Fact-Check Engine | Civic Quiz |
| :---: | :---: |
| ![FactCheck](https://raw.githubusercontent.com/Nitinkgupta9967/Prompt_War/main/screenshots/factcheck.png) | ![Quiz](https://raw.githubusercontent.com/Nitinkgupta9967/Prompt_War/main/screenshots/quiz.png) |

---

## 🌟 Key Features

- **🤖 AI Electoral Assistant**: Context-aware chat grounded in official ECI guidelines with bilingual support (English/Hindi).
- **🔍 Verified Fact-Checker**: Instant verification of viral claims using a dedicated election misinformation database.
- **🗺️ Booth Finder**: Real-time constituency and polling station search with mock data for demonstrations.
- **📅 Election Timeline**: Interactive roadmap of the polling phases and results.
- **🎓 Civic Quiz**: Engaging proficiency tests to educate voters on their rights and the voting process.

---

## 🏗️ Architecture

```mermaid
graph TD
    User((User)) --> NextJS[Next.js 14 Frontend]
    NextJS --> FastAPI[FastAPI Backend]
    FastAPI --> SQLite[(SQLite DB /tmp)]
    FastAPI --> OpenRouter[OpenRouter AI Engine]
    OpenRouter --> Claude[Claude 3.5 Sonnet]
    OpenRouter --> Gemini[Gemini 1.5 Pro]
    FastAPI --> RAG[RAG System / Official ECI Docs]
```

### Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS v4, Framer Motion.
- **Backend**: FastAPI (Python 3.12), SQLAlchemy (Async).
- **Database**: SQLite (Ephemeral for Cloud Run).
- **Deployment**: Google Cloud Run (Containerized).

---

## 🚀 Getting Started

### 1. Clone & Setup
```bash
git clone https://github.com/Nitinkgupta9967/Prompt_War.git
cd Prompt_War
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Disclaimer: This platform is for educational and awareness purposes. Always verify official details at [voters.eci.gov.in](https://voters.eci.gov.in).*
