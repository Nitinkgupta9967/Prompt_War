'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, MapPin, ExternalLink } from 'lucide-react';

const phases = [
  { phase: 1, date: "April 19, 2024", status: "completed", states: "Tamil Nadu, Rajasthan, Chhattisgarh, Madhya Pradesh, etc.", constituencies: 102 },
  { phase: 2, date: "April 26, 2024", status: "completed", states: "Kerala, Karnataka, Rajasthan, Uttar Pradesh, etc.", constituencies: 88 },
  { phase: 3, date: "May 7, 2024", status: "completed", states: "Gujarat, Karnataka, Maharashtra, Uttar Pradesh, etc.", constituencies: 94 },
  { phase: 4, date: "May 13, 2024", status: "completed", states: "Andhra Pradesh, Telangana, Uttar Pradesh, West Bengal, etc.", constituencies: 96 },
  { phase: 5, date: "May 20, 2024", status: "completed", states: "Maharashtra, Uttar Pradesh, West Bengal, Bihar, etc.", constituencies: 49 },
  { phase: 6, date: "May 25, 2024", status: "completed", states: "Delhi, Haryana, Uttar Pradesh, West Bengal, etc.", constituencies: 58 },
  { phase: 7, date: "June 1, 2024", status: "completed", states: "Uttar Pradesh, Punjab, West Bengal, Himachal Pradesh, etc.", constituencies: 57 },
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      {/* Prompt C - Green Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 p-4 bg-green-600 text-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-green-500"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={24} className="shrink-0" />
          <p className="text-sm md:text-base font-bold">
            Election Complete — Results declared June 4, 2024 · BJP-led NDA secures 293 seats · Narendra Modi sworn in for third term
          </p>
        </div>
        <a 
          href="https://eci.gov.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 px-4 py-2 bg-white text-green-700 rounded-lg text-xs font-extrabold whitespace-nowrap hover:bg-green-50 transition-colors"
        >
          Official Results <ExternalLink size={14} />
        </a>
      </motion.div>

      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Lok Sabha Election 2024 Timeline</h1>
        <p className="text-slate-500">The world&apos;s largest democratic exercise has concluded. Review the phase-wise schedule below.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-12">
          {/* Results Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 bg-[var(--navy)] text-white p-6 rounded-2xl shadow-xl border border-white/10"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-500 text-[10px] font-bold rounded-full mb-2 uppercase tracking-widest">
                  <CheckCircle2 size={10} /> Completed
                </div>
                <h3 className="text-xl font-bold">Declaration of Results</h3>
                <p className="text-xs text-slate-300">Final mandate across all 543 constituencies.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">June 4, 2024</div>
                <div className="text-[10px] opacity-70 uppercase tracking-wider">Election Day Result</div>
              </div>
            </div>
          </motion.div>

          {phases.map((p, idx) => (
            <motion.div 
              key={p.phase}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-green-500 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-500" />
              </div>

              <div className="md:w-1/2">
                <div className="card border-green-100 bg-white hover:border-green-500 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-widest">
                        {p.status}
                      </span>
                      <h4 className="font-bold mt-1">Phase {p.phase}: {p.date}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Seats</span>
                      <div className="font-bold text-[var(--saffron)]">{p.constituencies}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start text-xs text-slate-600">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <p><span className="font-bold">Key Areas:</span> {p.states}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
