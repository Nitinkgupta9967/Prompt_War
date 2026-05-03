'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Award, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  {
    q: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "Article 326 of the Constitution sets the voting age at 18."
  },
  {
    q: "What does NOTA stand for?",
    options: ["None Of The Above", "No Other Than Allowed", "Not On The Agenda", "Null Option To Abstain"],
    correct: 0,
    explanation: "NOTA was introduced by the Supreme Court in 2013."
  },
  {
    q: "Which Article of the Constitution gives citizens the right to vote?",
    options: ["Article 19", "Article 21", "Article 326", "Article 370"],
    correct: 2,
    explanation: "Article 326 grants universal adult suffrage."
  },
  {
    q: "How many phases did the 2024 Lok Sabha election have?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "The 2024 election was conducted in 7 phases from April 19 to June 1."
  },
  {
    q: "Which body conducts Lok Sabha elections in India?",
    options: ["Supreme Court", "Election Commission of India", "Parliament", "President of India"],
    correct: 1,
    explanation: "The ECI is an autonomous constitutional body."
  },
  {
    q: "What is an EPIC card?",
    options: ["Electronic Polling Identity Card", "Electors Photo Identity Card", "Election Process Identity Certificate", "Electoral Public Identity Code"],
    correct: 1,
    explanation: "EPIC is the Voter ID card issued by ECI."
  },
  {
    q: "What is the Model Code of Conduct?",
    options: ["A law passed by Parliament", "Guidelines for parties during elections", "A Supreme Court judgment", "A voter registration rule"],
    correct: 1,
    explanation: "MCC is enforced by ECI from election announcement to results."
  },
  {
    q: "What is the silent period before polling?",
    options: ["24 hours", "48 hours", "72 hours", "12 hours"],
    correct: 1,
    explanation: "Campaigning must stop 48 hours before polling ends."
  },
  {
    q: "Can a voter vote without a Voter ID card?",
    options: ["No, Voter ID is mandatory", "Yes, with any of 12 approved photo IDs", "Only with Aadhaar", "Only with a passport"],
    correct: 1,
    explanation: "ECI allows 12 alternative photo IDs including Aadhaar, passport, driving licence."
  },
  {
    q: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electoral Verification Method", "Electronic Voter Module", "Electoral Voting Mechanism"],
    correct: 0,
    explanation: "EVMs have been used in Indian elections since 1982."
  }
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === QUESTIONS[currentIdx].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card py-16">
          <Award size={80} className="mx-auto text-[var(--saffron)] mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Quiz Completed!</h1>
          <p className="text-xl text-slate-600 mb-12">
            You scored <span className="text-[var(--navy)] font-extrabold">{score} / {QUESTIONS.length}</span>
          </p>
          <button onClick={restartQuiz} className="btn-primary mx-auto flex items-center gap-2">
            <RotateCcw size={20} /> Restart Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const q = QUESTIONS[currentIdx];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <span className="text-[10px] font-bold text-[var(--saffron)] uppercase tracking-widest">Election Proficiency Test</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Civic Awareness Quiz</h1>
        
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
          <span>{score} Points</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--saffron)] transition-all duration-500" style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="card">
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-8">
              {q.q}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    isAnswered 
                      ? idx === q.correct 
                        ? 'bg-green-50 border-green-500 text-green-700' 
                        : selected === idx 
                          ? 'bg-red-50 border-red-500 text-red-700' 
                          : 'bg-white border-slate-100 text-slate-400'
                      : selected === idx 
                        ? 'border-[var(--navy)] bg-slate-50' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isAnswered && idx === q.correct ? 'bg-green-500 text-white' : 
                      isAnswered && selected === idx ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium text-sm">{opt}</span>
                  </div>
                  {isAnswered && idx === q.correct && <Check size={18} className="text-green-500" />}
                  {isAnswered && selected === idx && idx !== q.correct && <X size={18} className="text-red-500" />}
                </button>
              ))}
            </div>
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-blue-50 border border-blue-100 rounded-2xl"
            >
              <h4 className="text-sm font-bold text-blue-900 mb-1 uppercase tracking-tight">Explanation</h4>
              <p className="text-xs text-blue-800 leading-relaxed">{q.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-end pt-4">
            {isAnswered && (
              <button 
                onClick={nextQuestion}
                className="btn-primary py-3 px-8 flex items-center gap-2"
              >
                {currentIdx < QUESTIONS.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={20} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
