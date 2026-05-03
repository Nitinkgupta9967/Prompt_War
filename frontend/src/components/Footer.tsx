import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-[var(--navy)]">VoteSmart</span>
              <span className="text-xl font-bold text-[var(--saffron)]">India</span>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              An independent electoral awareness initiative. Data sourced from official Election Commission of India (ECI) public resources.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 text-sm text-slate-600 justify-center">
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--navy)]">ECI Portal</a>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--navy)]">NVSP</a>
            <a href="tel:1950" className="hover:text-[var(--navy)]">Voter Helpline (1950)</a>
            <Link href="/privacy" className="hover:text-[var(--navy)]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--navy)]">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          © 2024 VoteSmart India. Not affiliated with the Election Commission of India.
        </div>
      </div>
    </footer>
  );
}
