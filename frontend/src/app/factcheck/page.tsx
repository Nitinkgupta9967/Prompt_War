'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, HelpCircle, Search, Info, ExternalLink } from 'lucide-react';
import { factCheckClaim } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/i18n';

export default function FactCheckPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!claim.trim()) return;
    setIsLoading(true);
    
    try {
      const data = await factCheckClaim(claim);
      setResult(data);
    } catch (error) {
      setResult({
        verdict: 'UNVERIFIED',
        explanation: 'Connection error. Please try again later.',
        source: 'System'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Combat Misinformation</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Verify claims, news, and social media posts instantly. Our AI-driven engine cross-references information with official ECI data and trusted journalistic sources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Input Card */}
          <div className="card">
            <h3 className="font-bold mb-4">{t.factcheck_title}</h3>
            <div className="relative">
              <textarea 
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Paste a claim or WhatsApp forward to verify..."
                className="w-full bg-slate-50 border-slate-200 rounded-xl p-4 min-h-[120px] text-sm focus:ring-2 focus:ring-[var(--navy)] transition-all"
              />
              <button 
                onClick={handleCheck}
                disabled={isLoading}
                className="absolute bottom-4 right-4 btn-primary py-2 px-4 text-xs disabled:opacity-50"
              >
                {isLoading ? 'Checking...' : 'Verify Now'}
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* Result Card */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card border-l-8 ${
                result.verdict === 'FAKE' ? 'border-l-red-500' : 
                result.verdict === 'REAL' ? 'border-l-green-500' : 'border-l-orange-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                {result.verdict === 'FAKE' ? <ShieldAlert className="text-red-500" /> : 
                 result.verdict === 'REAL' ? <CheckCircle className="text-green-500" /> : <HelpCircle className="text-orange-500" />}
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  result.verdict === 'FAKE' ? 'text-red-500' : 
                  result.verdict === 'REAL' ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {result.verdict}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-4">&quot;{claim}&quot;</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase mb-1">Detailed Explanation</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.explanation}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Info size={14} />
                    <span>Source: {result.source}</span>
                  </div>
                  <button className="text-[var(--navy)] text-xs font-bold flex items-center gap-1">
                    View Official Source <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="card bg-[var(--navy)] text-white">
            <h3 className="font-bold mb-4">Trust Matrix</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Verified Sources</span>
                  <span>12+</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-full" />
                </div>
              </div>
              <p className="text-[10px] text-slate-300">
                This result is corroborated by the ECI, Press Information Bureau (PIB), and multiple independent news organizations.
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold mb-4 text-sm">How we verify</h3>
            <ul className="space-y-3">
              {[
                "Cross-referencing with official gazettes",
                "Metadata analysis of viral images",
                "AI-pattern matching against known campaigns"
              ].map(item => (
                <li key={item} className="flex gap-2 text-xs text-slate-600">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
