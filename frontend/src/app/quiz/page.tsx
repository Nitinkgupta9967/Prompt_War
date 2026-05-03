'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Info, Award } from 'lucide-react';
import { getQuizQuestions } from '@/lib/api';

export default function QuizPage() {
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    getQuizQuestions(10).then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-center">Loading quiz...</div>;
  if (questions.length === 0) return <div className="p-20 text-center">No questions found.</div>;

  const q = questions[currentIdx];

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelected(id);
    setIsAnswered(true);
    if (id === q.correct_option) setScore(score + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <span className="text-[10px] font-bold text-[var(--saffron)] uppercase tracking-widest">Election Proficiency Test</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Civic Awareness Quiz</h1>
        
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Question {currentIdx + 1} of 10</span>
          <span>{score} Points</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--saffron)] transition-all" style={{ width: `${(currentIdx + 1) * 10}%` }} />
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
              <span className="text-[10px] text-slate-400 font-medium">45s remaining</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-8">
              {q.question}
            </h2>

            <div className="space-y-4">
              {q.options.map((opt: { id: string; text: string }) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    isAnswered 
                      ? opt.id === q.correct 
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
                      isAnswered && opt.id === q.correct ? 'bg-green-500 text-white' : 
                      isAnswered && selected === opt.id ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="font-medium text-sm">{opt.text}</span>
                  </div>
                  {isAnswered && opt.id === q.correct && <Check size={18} className="text-green-500" />}
                  {isAnswered && selected === opt.id && opt.id !== q.correct && <X size={18} className="text-red-500" />}
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
                  <p className="text-xs text-blue-800 leading-relaxed">{q.insight}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between items-center pt-8">
            <button className="text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors">Previous</button>
            <button className="btn-primary py-2 px-6">
              Next Question <ArrowRight size={18} />
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
