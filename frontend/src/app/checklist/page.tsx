'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Check Eligibility', desc: 'Are you 18+ and an Indian citizen?', link: '#' },
  { id: 2, title: 'Verify Name in Roll', desc: 'Check if you are registered in the Electoral Roll.', link: '/lookup' },
  { id: 3, title: 'Find Your Polling Station', desc: 'Locate your designated booth.', link: '/lookup' },
  { id: 4, title: 'Valid Identification', desc: 'Ensure you have your Voter ID or alternative photo ID.', link: '#' },
  { id: 5, title: 'Check Your Date & Time', desc: 'Know when your phase is voting.', link: '/timeline' },
  { id: 6, title: 'Go Vote!', desc: 'Cast your ballot on election day.', link: '#' },
];

export default function ChecklistPage() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const progress = (completed.length / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Voting Checklist</h1>
        <p className="text-slate-500">Interactive guide to ensure you are ready for election day.</p>
        
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[var(--saffron)] to-[var(--navy)]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => toggleStep(step.id)}
            className={`card cursor-pointer transition-all border-2 ${
              completed.includes(step.id) ? 'border-green-500 bg-green-50/30' : 'border-transparent'
            }`}
          >
            <div className="flex gap-4">
              <div className="shrink-0 mt-1">
                {completed.includes(step.id) ? (
                  <CheckCircle2 size={24} className="text-green-500" />
                ) : (
                  <Circle size={24} className="text-slate-200" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className={`font-bold mb-1 ${completed.includes(step.id) ? 'text-green-900' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{step.desc}</p>
                {step.link !== '#' && (
                  <button className="text-[var(--navy)] text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Go to tool <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-[var(--navy)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <ShieldCheck size={32} className="text-[var(--saffron)]" />
          <div>
            <h4 className="font-bold">Privacy Guaranteed</h4>
            <p className="text-xs text-slate-300">Your progress is saved locally. No personal data is collected.</p>
          </div>
        </div>
        <button className="btn-secondary border-white/20 text-white bg-white/10 hover:bg-white/20">
          Download PDF Guide <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
