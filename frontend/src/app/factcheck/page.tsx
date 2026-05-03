'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, CheckCircle, HelpCircle, Info } from 'lucide-react';
import { factCheckClaim } from '@/lib/api';

export default function FactCheckPage() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!claim.trim()) return;
    setIsLoading(true);
    
    // Local fallback logic
    const lowerClaim = claim.toLowerCase();
    let localResult = null;

    if (lowerClaim.includes('evm') && lowerClaim.includes('hack')) {
      localResult = {
        verdict: 'FAKE',
        explanation: 'EVMs are standalone machines not connected to any network. Source: ECI',
        source: 'ECI'
      };
    } else if (lowerClaim.includes('aadhaar') && lowerClaim.includes('vote')) {
      localResult = {
        verdict: 'MISLEADING',
        explanation: 'Aadhaar is not the only accepted ID. ECI accepts 12 photo IDs.',
        source: 'ECI'
      };
    }

    try {
      const data = await factCheckClaim(claim);
      setResult(data || localResult || {
        verdict: 'UNVERIFIED',
        explanation: 'This claim could not be verified against our database. Check eci.gov.in for official information.',
        source: 'System'
      });
    } catch (error) {
      setResult(localResult || {
        verdict: 'UNVERIFIED',
        explanation: 'This claim could not be verified against our database. Check eci.gov.in for official information.',
        source: 'System'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictStyles = (verdict: string) => {
    switch (verdict) {
      case 'REAL': return 'bg-green-100 text-green-700 border-green-200';
      case 'FAKE': return 'bg-red-100 text-red-700 border-red-200';
      case 'MISLEADING': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'REAL': return <CheckCircle className="text-green-600" size={18} />;
      case 'FAKE': return <ShieldAlert className="text-red-600" size={18} />;
      case 'MISLEADING': return <Info className="text-amber-600" size={18} />;
      default: return <HelpCircle className="text-slate-600" size={18} />;
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
        {/* Input Card - Unconditionally Rendered */}
        <div className="card">
          <label className="block text-sm font-bold text-slate-700 mb-3">Verify a Claim</label>
          <textarea 
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Paste a claim or WhatsApp forward here to verify..."
            rows={4}
            className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[var(--navy)] transition-all mb-4"
          />
          <button 
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Verify Now'}
            <Search size={20} />
          </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="card border-l-8 border-l-[var(--navy)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`px-3 py-1 rounded-full border text-[10px] font-extrabold tracking-widest flex items-center gap-2 ${getVerdictStyles(result.verdict)}`}>
                  {getVerdictIcon(result.verdict)}
                  {result.verdict}
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 leading-relaxed">&quot;{claim}&quot;</h4>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Explanation</h5>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {result.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
