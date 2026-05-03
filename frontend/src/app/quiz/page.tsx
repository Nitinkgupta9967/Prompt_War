'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Info, Award } from 'lucide-react';
import { getQuizQuestions } from '@/lib/api';

const fallbackQuestions = [
  {
    id: "1",
    question: "What is the minimum voting age in India?",
    options: [
      { id: "A", text: "16 Years" },
      { id: "B", text: "18 Years" },
      { id: "C", text: "21 Years" },
      { id: "D", text: "25 Years" }
    ],
    correct: "B",
    insight: "The voting age was reduced from 21 to 18 years by the 61st Amendment Act of 1988."
  },
  {
    id: "2",
    question: "What does NOTA stand for on an EVM?",
    options: [
      { id: "A", text: "None Of The Above" },
      { id: "B", text: "New Option To All" },
      { id: "C", text: "Next Option To Apply" },
      { id: "D", text: "None Of These Answers" }
    ],
    correct: "A",
    insight: "NOTA allows voters to officially register a vote of rejection for all candidates."
  },
  {
    id: "3",
    question: "Which Article of the Constitution gives the Right to Vote?",
    options: [
      { id: "A", text: "Article 21" },
      { id: "B", text: "Article 326" },
      { id: "C", text: "Article 370" },
      { id: "D", text: "Article 44" }
    ],
    correct: "B",
    insight: "Article 326 provides for universal adult suffrage for elections to the Lok Sabha and State Assemblies."
  },
  {
    id: "4",
    question: "How many phases were held in the 2024 Lok Sabha elections?",
    options: [
      { id: "A", text: "5 Phases" },
      { id: "B", text: "7 Phases" },
      { id: "C", text: "9 Phases" },
      { id: "D", text: "1 Phase" }
    ],
    correct: "B",
    insight: "The 2024 elections were conducted in 7 phases starting from April 19 to June 1."
  },
  {
    id: "5",
    question: "Which body conducts the Lok Sabha elections in India?",
    options: [
      { id: "A", text: "Supreme Court" },
      { id: "B", text: "Parliament" },
      { id: "C", text: "Election Commission of India" },
      { id: "D", text: "Ministry of Home Affairs" }
    ],
    correct: "C",
    insight: "The ECI is an autonomous constitutional authority responsible for administering election processes in India."
  }
];

export default function QuizPage() {
  const [questions, setQuestions] = React.useState<any[]>(fallbackQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  React.useEffect(() => {
    getQuizQuestions(10)
      .then(data => {
        if (data && data.length > 0) setQuestions(data);
      })
      .catch(() => {
        console.log("Using fallback questions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelected(id);
    setIsAnswered(true);
    if (id === questions[currentIdx].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) return <div className="p-20 text-center flex flex-col items-center gap-4"><div className="w-12 h-12 border-4 border-[var(--navy)] border-t-transparent rounded-full animate-spin"></div>Loading quiz questions...</div>;

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="card py-16">
          <Award size={80} className="mx-auto text-[var(--saffron)] mb-6" />
          <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl text-slate-600 mb-8">Your Score: <span className="text-[var(--navy)] font-bold">{score} / {questions.length}</span></p>
          <button onClick={() => window.location.reload()} className="btn-primary mx-auto">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <span className="text-[10px] font-bold text-[var(--saffron)] uppercase tracking-widest">Election Proficiency Test</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Civic Awareness Quiz</h1>
        
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>{score} Points</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--saffron)] transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
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
            <div className="flex justify-between items-center mb-6">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">CONSTITUTIONAL LAW</span>
              <span className="text-[10px] text-slate-400 font-medium">{questions.length - currentIdx} questions left</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-8">
              {questions[currentIdx].question}
            </h2>

            <div className="space-y-4">
              {questions[currentIdx].options.map((opt: { id: string; text: string }) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    isAnswered 
                      ? opt.id === questions[currentIdx].correct 
                        ? 'bg-green-50 border-green-500 text-green-700' 
                        : selected === opt.id 
                          ? 'bg-red-50 border-red-500 text-red-700' 
                          : 'bg-white border-slate-100 text-slate-400'
                      : selected === opt.id 
                        ? 'border-[var(--navy)] bg-slate-50' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isAnswered && opt.id === questions[currentIdx].correct ? 'bg-green-500 text-white' : 
                      isAnswered && selected === opt.id ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="font-medium text-sm">{opt.text}</span>
                  </div>
                  {isAnswered && opt.id === questions[currentIdx].correct && <Check size={18} className="text-green-500" />}
                  {isAnswered && selected === opt.id && opt.id !== questions[currentIdx].correct && <X size={18} className="text-red-500" />}
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
              <div className="flex gap-3">
                <Info size={20} className="text-blue-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">EXPERT INSIGHT</h4>
                  <p className="text-xs text-blue-800 leading-relaxed">{questions[currentIdx].insight}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-end items-center pt-8">
            <button 
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="btn-primary py-2 px-6 disabled:opacity-50"
            >
              {currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 card overflow-hidden p-0 flex flex-col md:flex-row">
        <div className="p-8 md:w-1/2">
          <h3 className="text-xl font-bold mb-4">Did You Know?</h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            The first Chief Election Commissioner of India was Sukumar Sen. He oversaw India&apos;s first general election in 1951-52, which was the world&apos;s largest democratic exercise at the time.
          </p>
          <a href="#" className="text-[var(--saffron)] text-sm font-bold underline">Learn more about EC history</a>
        </div>
        <div className="md:w-1/2 bg-slate-200 flex items-center justify-center p-8">
          <Award size={100} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}
