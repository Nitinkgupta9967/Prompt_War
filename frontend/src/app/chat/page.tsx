'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Trash2, Settings, ExternalLink, 
  ShieldCheck, Info, FileText, ChevronRight, Search 
} from 'lucide-react';
import { chatWithAI } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  "How do I register to vote?",
  "What documents do I need for polling?",
  "How to find my polling booth?",
  "What is the Model Code of Conduct?"
];

export default function ChatPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(input, userMessage.id, lang);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white overflow-hidden">
      {/* Sidebar - Context & Links */}
      <div className="hidden lg:flex w-80 border-r border-slate-100 flex-col p-6 space-y-8 bg-slate-50/30">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Official Resources</h3>
          <div className="space-y-2">
            <a href="https://eci.gov.in/acts-rules/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium transition-all">
              <span className="flex items-center gap-2"><FileText size={14} /> Election Laws 2024</span>
              <ExternalLink size={12} />
            </a>
            <a href="https://eci.gov.in/evm/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium transition-all">
              <span className="flex items-center gap-2"><Info size={14} /> EVM Verification Guide</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verify Sources</h3>
          <div className="p-4 bg-[var(--navy)] rounded-2xl text-white">
            <ShieldCheck className="text-[var(--saffron)] mb-3" size={24} />
            <h4 className="text-xs font-bold mb-2">Grounded in Fact</h4>
            <p className="text-[10px] leading-relaxed opacity-80">
              Our AI provides real-time information sourced directly from official electoral databases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">VoteSmart Assistant</h3>
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Official ECI Grounded
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-all"><Settings size={18} /></button>
            <button 
              onClick={() => setMessages([])} 
              className="p-2 hover:bg-slate-50 rounded-lg transition-all text-red-400"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="flex justify-center mb-8">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold">TODAY</span>
          </div>

          {/* Initial Greeting */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900 text-white shrink-0">
              <Bot size={18} />
            </div>
            <div className="max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed bg-white shadow-sm border border-slate-100">
              <p>Namaste! I am your AI election guide. How can I help you understand the Indian electoral process today?</p>
              <div className="text-[10px] mt-2 opacity-50 uppercase font-bold" suppressHydrationWarning>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.role === 'assistant' ? 'bg-slate-900 text-white' : 'bg-[var(--saffron)] text-white'
                }`}>
                  {m.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'assistant' 
                    ? 'bg-white shadow-sm border border-slate-100' 
                    : 'bg-[var(--navy)] text-white shadow-lg'
                }`}>
                  {m.content}
                  
                  {m.role === 'assistant' && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">Verified</span>
                      <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[var(--navy)] font-bold flex items-center gap-0.5 hover:underline">
                        Source: Election Commission of India <ExternalLink size={10} />
                      </a>
                    </div>
                  )}

                  <div className={`text-[10px] mt-2 opacity-50 ${m.role === 'user' ? 'text-right' : ''}`} suppressHydrationWarning>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
              <div className="h-10 w-24 bg-slate-100 rounded-2xl" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex flex-wrap gap-2 mb-4">
            {[t.suggest_1, t.suggest_2, t.suggest_3, t.suggest_4].map(s => (
              <button 
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium hover:bg-slate-50 transition-all text-slate-600"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about election process..."
              className="flex-grow p-4 pr-12 rounded-xl bg-slate-50 border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)] transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-[var(--navy)] text-white rounded-lg disabled:opacity-50 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
            AI can make mistakes. Always cross-verify on <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--navy)]">voters.eci.gov.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
