'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar, MapPin } from 'lucide-react';

const phases = [
  { phase: 1, date: "April 19, 2024", status: "COMPLETED", states: "Tamil Nadu, Rajasthan, Chhattisgarh, Madhya Pradesh, etc.", constituencies: 102 },
  { phase: 2, date: "April 26, 2024", status: "COMPLETED", states: "Kerala, Karnataka, Rajasthan, Uttar Pradesh, etc.", constituencies: 88 },
  { phase: 3, date: "May 7, 2024", status: "COMPLETED", states: "Gujarat, Karnataka, Maharashtra, Uttar Pradesh, etc.", constituencies: 94 },
  { phase: 4, date: "May 13, 2024", status: "UPCOMING", states: "Andhra Pradesh, Telangana, Uttar Pradesh, West Bengal, etc.", constituencies: 96 },
  { phase: 5, date: "May 20, 2024", status: "SCHEDULED", states: "Maharashtra, Uttar Pradesh, West Bengal, Bihar, etc.", constituencies: 49 },
  { phase: 6, date: "May 25, 2024", status: "SCHEDULED", states: "Delhi, Haryana, Uttar Pradesh, West Bengal, etc.", constituencies: 58 },
  { phase: 7, date: "June 1, 2024", status: "SCHEDULED", states: "Uttar Pradesh, Punjab, West Bengal, Himachal Pradesh, etc.", constituencies: 57 },
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Lok Sabha Election 2024 Timeline</h1>
        <p className="text-slate-500">Track the world&apos;s largest democratic exercise through seven strategic phases.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-12">
          {/* Grand Finale Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative z-10 bg-[var(--navy)] text-white p-6 rounded-2xl shadow-xl border border-white/10"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Grand Finale</span>
                <h3 className="text-xl font-bold">Declaration of Results</h3>
                <p className="text-xs text-slate-300">Verification of democratic mandate across all 543 constituencies.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">June 4, 2024</div>
                <div className="text-[10px] opacity-70 uppercase tracking-wider">National Vote Counting Day</div>
              </div>
            </div>
          </motion.div>

          {phases.map((p, idx) => (
            <motion.div 
              key={p.phase}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-slate-200 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                {p.status === 'COMPLETED' ? <CheckCircle2 size={16} className="text-green-500" /> : <Clock size={16} className="text-slate-400" />}
              </div>

              <div className="md:w-1/2">
                <div className="card hover:border-[var(--navy)] transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                        p.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {p.status}
                      </span>
                      <h4 className="font-bold mt-1">Phase {p.phase}: {p.date}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Constituencies</span>
                      <div className="font-bold text-[var(--saffron)]">{p.constituencies}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start text-xs text-slate-600">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <p><span className="font-bold">Key States/UTs:</span> {p.states}</p>
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
