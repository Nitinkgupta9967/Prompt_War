'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, User } from 'lucide-react';
import { translations } from '../lib/i18n';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const t = translations[lang];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Chat', path: '/chat' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Fact-Check', path: '/factcheck' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Lookup', path: '/lookup' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--navy)]">VoteSmart</span>
              <span className="text-2xl font-bold text-[var(--saffron)]">India</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-[var(--navy)] ${
                  pathname === link.path ? 'text-[var(--navy)] border-b-2 border-[var(--navy)]' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-sm font-medium"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
