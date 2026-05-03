# 🇮🇳 VoteSmart India — AI-Powered Electoral Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![AI-Powered](https://img.shields.io/badge/AI-Powered-blueviolet)](https://openrouter.ai/)

**VoteSmart India** is a premium, AI-driven platform designed to empower Indian citizens with accurate, official, and accessible electoral information. Built for the 2024 General Elections and beyond, it combines real-time AI assistance with verified ECI data to combat misinformation and promote civic awareness.

---

## 🌟 Key Features

### 🤖 AI Electoral Assistant
*   **Context-Aware Chat**: Powered by Gemini/Claude via OpenRouter, grounded in official ECI guidelines.
*   **Bilingual Support**: Full support for English and Hindi (Toggleable).
*   **Robust Fallback**: Multi-model fallback system (Llama 3.1, Claude 3.5) ensures 99.9% availability.

### 🔍 Verified Tools
*   **Voter Lookup & Booth Finder**: Real-time constituency and polling station search simulation.
*   **Fact-Check Engine**: Instant verification of viral claims and election news.
*   **Interactive Election Timeline**: 7-phase roadmap of the 2024 General Elections.

### 🎓 Civic Engagement
*   **Civic Awareness Quiz**: Test your election knowledge with expert insights.
*   **Pre-Vote Checklist**: Step-by-step preparation guide for voters.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: FastAPI (Python 3.12), SQLAlchemy (Async), SQLite.
- **AI/LLM**: OpenRouter API (Llama 3.1 / Gemini), Anthropic API (Fallback).
- **Deployment**: Docker-ready, optimized for Google Cloud Run / Vercel.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- API Keys: OpenRouter or Anthropic

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

# Create .env and add your keys
echo "OPENROUTER_API_KEY=your_key_here" > .env
echo "ANTHROPIC_API_KEY=your_key_here" >> .env

# Initialize Database
python startup.py

# Start Server
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app!

---

## 🏗️ Architecture

```text
votesmart-india/
├── frontend/           # Next.js 14 Web Application
│   ├── src/app/        # Pages and Routing
│   ├── src/components/ # Reusable UI Components
│   └── src/lib/        # API Clients and Context
├── backend/            # FastAPI Python API
│   ├── data/           # Seed JSON data (FAQs, Misinfo)
│   ├── models.py       # Database Schemas
│   ├── rag.py          # AI Logic & Fallback System
│   └── main.py         # API Endpoints
└── Dockerfile          # Production ready containers
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---
*Disclaimer: This platform is for educational and awareness purposes. Always verify official details at [voters.eci.gov.in](https://voters.eci.gov.in).*
