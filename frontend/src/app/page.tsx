'use client';

// Force Deploy Timestamp: 2026-05-04 02:10 AM
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Award, 
  MapPin, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { translations } from '@/lib/i18n';
import { useLanguage } from '@/lib/LanguageContext';

const features = [
  { 
    id: 'chat',
    title: 'feature_chat', 
    desc: 'Ask any electoral question in your local language and get instant, verified answers from our AI assistant.',
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-600',
    link: '/chat',
    linkText: 'Explore'
  },
  { 
    id: 'timeline',
    title: 'feature_timeline', 
    desc: 'Stay updated with critical dates for registration, nominations, and polling phases across all states and UTs.',
    icon: Calendar,
    color: 'bg-orange-100 text-orange-600',
    link: '/timeline',
    linkText: 'View Calendar'
  },
  { 
    id: 'factcheck',
    title: 'feature_factcheck', 
    desc: 'Combat misinformation. Verify viral claims with official data sources and expert electoral insights.',
    icon: ShieldCheck,
    color: 'bg-green-100 text-green-600',
    link: '/factcheck',
    linkText: 'Verify News'
  },
  { 
    id: 'quiz',
    title: 'feature_quiz', 
    desc: 'Test your knowledge about the Indian Constitution and the electoral process through interactive challenges.',
    icon: Award,
    color: 'bg-red-100 text-red-600',
    link: '/quiz',
    linkText: 'Start Quiz'
  },
  { 
    id: 'lookup',
    title: 'feature_lookup', 
    desc: 'Locate your designated polling station on the map and get directions from your current location.',
    icon: MapPin,
    color: 'bg-purple-100 text-purple-600',
    link: '/lookup',
    linkText: 'Locate Now'
  },
  { 
    id: 'docs',
    title: 'feature_docs', 
    desc: 'Download essential forms, voter guides, and official handbooks directly from the Election Commission.',
    icon: FileText,
    color: 'bg-slate-100 text-slate-600',
    link: 'https://eci.gov.in/eci-content/documents/',
    linkText: 'Download'
  }
];

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-6 border border-orange-100">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Official ECI Data Portal
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Empowering Every <br/>
                <span className="text-[var(--saffron)]">Indian Voter</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Navigate the democratic process with clarity. Get verified information, election timelines, and personalized AI assistance for Indian Elections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/chat" className="btn-primary px-8">
                  {t.start_chatting}
                  <MessageSquare size={18} />
                </Link>
                <Link href="/lookup" className="btn-secondary px-8">
                  {t.check_status}
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/hero-image.png" 
                  alt="Indian Voters" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-[var(--navy)] uppercase tracking-widest mb-4">
            {t.toolbox_title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">
            Access everything you need to be an informed participant in India&apos;s democracy. From AI guidance to official documentation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card flex flex-col items-start text-left group hover:border-[var(--saffron)] transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.id === 'timeline' ? 'Election Timeline' : feature.id === 'lookup' ? 'Booth Finder' : t[feature.title as keyof typeof t]}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{feature.desc}</p>
                <Link href={feature.link} className="flex items-center gap-2 text-sm font-bold text-[var(--navy)] hover:gap-3 transition-all">
                  {feature.linkText}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[var(--navy)] py-16 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Trust In Every Data Point</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our platform is grounded in official Election Commission of India (ECI) datasets. Every bit of information is verified against government records for 100% accuracy and non-partisan clarity.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-[var(--saffron)]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">Verified Source</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Award size={24} className="text-[var(--saffron)]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">Non-Partisan</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar size={24} className="text-[var(--saffron)]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">Official ECI Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
