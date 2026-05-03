'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, HelpCircle, Search, Info } from 'lucide-react';
import { factCheckClaim } from '@/lib/api';

export default function FactCheckPage() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    
    // Local logic for specific keywords
    const lower = inputValue.toLowerCase();
    let localVerdict = null;

    if (lower.includes('evm') && lower.includes('hack')) {
      localVerdict = {
        verdict: 'FAKE',
        explanation: 'EVMs are standalone machines not connected to any network. Source: ECI'
      };
    } else if (lower.includes('aadhaar') && lower.includes('vote')) {
      localVerdict = {
        verdict: 'MISLEADING',
        explanation: 'Aadhaar is not the only accepted ID. ECI accepts 12 photo IDs.'
      };
    }

    try {
      const data = await factCheckClaim(inputValue);
      setResult(data || localVerdict || {
        verdict: 'UNVERIFIED',
        explanation: 'This claim could not be verified against our database. Check eci.gov.in for official information.'
      });
    } catch (error) {
      setResult(localVerdict || {
        verdict: 'UNVERIFIED',
        explanation: 'This claim could not be verified against our database. Check eci.gov.in for official information.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Combat Misinformation</h1>
        <p className="text-slate-500">
          Verify election-related claims instantly using official data and verified reports.
        </p>
      </div>

      <div className="space-y-8">
        <div className="card">
          <h3 className="font-bold mb-4">Verify a Claim</h3>
          
          {/* Unconditional Rendering as requested */}
          <textarea 
            rows={4} 
            placeholder="Paste a claim or WhatsApp forward here to verify..." 
            className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium mt-2 hover:bg-orange-600 transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify Now'}
          </button>

          {/* Verdict Badge */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border-t border-slate-100"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                  result.verdict === 'FAKE' ? 'bg-red-100 text-red-700' : 
                  result.verdict === 'REAL' ? 'bg-green-100 text-green-700' : 
                  result.verdict === 'MISLEADING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {result.verdict === 'FAKE' ? <ShieldAlert size={14} /> : 
                   result.verdict === 'REAL' ? <CheckCircle size={14} /> : <HelpCircle size={14} />}
                  {result.verdict}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="card bg-slate-50 border-dashed border-2">
          <div className="flex gap-4 items-start">
            <Info className="text-[var(--navy)] shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold mb-1">How it works</h4>
              <p className="text-xs text-slate-500">
                Our engine uses semantic search across ECI press releases, official gazettes, and PIB Fact Check data to verify your queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
