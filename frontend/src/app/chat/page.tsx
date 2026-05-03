'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, Settings, Info, ExternalLink, Paperclip, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/i18n';
import { chatWithAI } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I am your VoteSmart AI assistant. I can help you with voter registration, candidate information, and polling details. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

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
      const data = await chatWithAI(input, 'session-123', lang);
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I am having trouble connecting to my knowledge base right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "How do I register to vote?",
    "What documents do I need?",
    "What is NOTA?",
    "How does EVM work?"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 h-[calc(100vh-120px)]">
      {/* Sidebar - Official Data */}
      <div className="hidden lg:flex flex-col w-64 gap-4">
        <div className="card h-fit">
          <div className="flex items-center gap-2 mb-4 text-[var(--navy)]">
            <ShieldCheck size={20} />
            <h3 className="font-bold">Official Data</h3>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Our AI provides real-time information sourced directly from official electoral databases.
          </p>
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
        
        <div className="card h-fit flex-grow bg-[var(--navy)] text-white overflow-hidden p-0">
          <div className="p-4 h-full flex flex-col">
            <img src="/hero-image.png" className="w-full h-32 object-cover rounded-lg mb-4 opacity-50" />
            <h4 className="font-bold text-sm mb-2">Civic Duty Matters</h4>
            <p className="text-[10px] text-slate-300 mb-4">Know your rights before you head to the polls.</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col card p-0 overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">VoteSmart Assistant</h3>
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Verified Official Source
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-all"><Settings size={18} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-all text-red-400"><Trash2 size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="flex justify-center mb-8">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold">TODAY</span>
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
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
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
            <button className="p-2 text-slate-400 hover:text-slate-600"><Paperclip size={20} /></button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question here..."
              className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--navy)] transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-[var(--navy)] text-white p-3 rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-4 italic">
            Information provided is for awareness purposes based on official ECI guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
