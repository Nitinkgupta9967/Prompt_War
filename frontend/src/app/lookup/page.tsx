'use client';

import React, { useState } from 'react';
import { Search, MapPin, Phone, ExternalLink, Printer } from 'lucide-react';
import { lookupVoter } from '@/lib/api';

export default function LookupPage() {
  const [epic, setEpic] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!epic) return;
    
    // Demo Mock for ABC1234567
    if (epic.toUpperCase() === 'ABC1234567') {
      setResult({
        name: "Rahul Sharma",
        epic: "ABC1234567",
        assembly: "New Delhi (01)",
        state: "Delhi",
        parliament: "New Delhi (GEN)",
        polling_station: "Govt. Sr. Sec. School, Connaught Place",
        address: "Booth No. 142, Sector 4, New Delhi",
        travel_time: "12 Mins (Walk)"
      });
      return;
    }

    try {
      const data = await lookupVoter({ epic });
      if (data) {
        setResult({
          ...data,
          assembly: data.constituency || "Unknown",
          parliament: "New Delhi (GEN)", 
          travel_time: "12 Mins (Walk)"
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side - Search */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Voter Lookup</h1>
            <p className="text-slate-500">
              Verify your details in the Electoral Roll and locate your designated polling station using your EPIC (Electors Photo Identification Card) number.
            </p>
          </div>

          <div className="card">
            <label className="block text-sm font-bold text-slate-700 mb-2">EPIC Number (Voter ID)</label>
            <div className="relative">
              <input 
                type="text" 
                value={epic}
                onChange={(e) => setEpic(e.target.value)}
                placeholder="E.G. ABC1234567"
                className="w-full bg-white border-slate-200 rounded-xl px-4 py-4 pr-12 text-sm focus:ring-2 focus:ring-[var(--navy)] transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 italic">Found on the front of your voter identity card.</p>
            <button 
              onClick={handleSearch}
              className="w-full btn-primary mt-6 py-4"
            >
              <MapPin size={20} /> Find My Booth
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4">
              This is a demo. For real lookup visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--navy)]">voters.eci.gov.in</a>
            </p>
          </div>

          <div className="card border-l-4 border-l-[var(--saffron)] bg-slate-50">
            <h4 className="font-bold text-sm mb-2">Notice for New Voters</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              If you recently registered, it may take up to 15 days for your records to appear in the digital lookup system. Please contact your BLO if the issue persists.
            </p>
          </div>
        </div>

        {/* Right Side - Result */}
        <div className="space-y-8">
          {result ? (
            <div className="space-y-8">
              <div className="card border-t-8 border-t-[var(--saffron)] relative">
                <button className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[var(--navy)]"><Printer size={20} /></button>
                <div className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded mb-4">VERIFIED RECORD</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{result.name}</h2>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">EPIC: {result.epic}</span>
                
                <div className="grid grid-cols-2 gap-8 mt-8 border-t border-slate-100 pt-8">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Assembly Constituency</h5>
                    <p className="text-sm font-bold text-slate-800">{result.assembly}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Parliamentary Constituency</h5>
                    <p className="text-sm font-bold text-slate-800">{result.parliament}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                  <MapPin className="text-[var(--saffron)] shrink-0" size={20} />
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Polling Station Name & Address</h5>
                    <p className="text-sm font-bold text-slate-800">{result.polling_station}</p>
                    <p className="text-xs text-slate-500 mt-1">{result.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="flex-1 btn-secondary text-xs py-3 gap-2"><MapPin size={16} /> Map Link (Google Maps)</button>
                  <button className="flex-1 btn-secondary text-xs py-3 gap-2"><Phone size={16} /> Contact BLO</button>
                </div>
              </div>

              {/* Map Mockup */}
              <div className="card p-0 overflow-hidden relative h-64 bg-slate-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <MapPin size={48} className="text-[var(--navy)]" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 glass p-3 rounded-xl border border-white/20">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Travel Time</div>
                  <div className="text-lg font-bold text-slate-900">{result.travel_time}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center py-32 text-center border-dashed border-2">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="font-bold text-slate-400">Search to view results</h3>
              <p className="text-xs text-slate-300">Your details will appear here once verified.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
