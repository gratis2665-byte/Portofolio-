import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Award,
  Terminal,
  Download,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, CLIENT_LOGOS } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenWhatsAppModal: () => void;
  onExploreSyllabus: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onOpenWhatsAppModal,
  onExploreSyllabus,
}) => {
  const techStackBadges = [
    'Kubernetes & Docker',
    'AWS / GCP Cloud',
    'Enterprise Microservices',
    'React 19 & TypeScript',
    'Applied AI & RAG',
    'DevOps CI/CD & GitOps',
    'Domain-Driven Design',
    'Corporate IT Pedagogy',
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle organic background mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-stone-200/40 dark:bg-stone-800/20 blur-3xl rounded-full" />
        <div className="absolute top-48 right-10 w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Status & Intro Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Halo, saya Alfi</span>
              </div>

              {PERSONAL_INFO.availabilityStatus && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs">
                  <span>{PERSONAL_INFO.availabilityStatus}</span>
                </div>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal tracking-tight text-stone-900 dark:text-stone-100 leading-[1.2] mb-4">
              Arsitektur Sistem Tangguh &{' '}
              <span className="font-serif italic font-normal text-emerald-800 dark:text-emerald-400">
                Pemberdayaan Talenta IT
              </span>{' '}
              Berkualitas.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mb-7">
              Halo, saya <span className="font-semibold text-stone-900 dark:text-stone-100">{PERSONAL_INFO.name || 'Alfi'}</span> — 
              IT Specialist &amp; Principal Corporate Trainer. Berpengalaman 8+ tahun merancang sistem 
              skala tinggi dan memandu lebih dari <strong className="font-semibold text-stone-900 dark:text-stone-100">5.200+ profesional teknologi</strong> menguasai 
              Cloud Native, Microservices, dan AI Engineering.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenWhatsAppModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-xs hover:shadow-md cursor-pointer group"
                id="hero-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4 text-emerald-100 transition-transform group-hover:scale-110" />
                <span>Konsultasi / Booking Pelatihan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 font-medium text-sm transition-colors cursor-pointer"
                id="hero-projects-btn"
              >
                <span>Lihat Portofolio Karya</span>
              </button>

              <button
                onClick={onExploreSyllabus}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 font-medium text-sm transition-colors cursor-pointer"
                id="hero-syllabus-btn"
              >
                <Terminal className="w-4 h-4 text-stone-500" />
                <span>Silabus Pelatihan</span>
              </button>
            </div>

            {/* Key Trust Signals / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800/80 w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 border border-stone-200 dark:border-stone-800">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">5,200+ Peserta</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Tersertifikasi Lulus</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 border border-stone-200 dark:border-stone-800">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">45+ Korporasi</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">BUMN &amp; Unicorn Tech</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 border border-stone-200 dark:border-stone-800">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">98.8% Kepuasan</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Skor CSAT Evaluasi</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card / Interactive Profile Highlights */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative rounded-2xl bg-white dark:bg-[#181816] p-6 sm:p-7 border border-stone-200/90 dark:border-stone-800/90 shadow-sm">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Alfi - IT Specialist & Technical Trainer"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-stone-100 dark:border-stone-800 shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 text-white rounded-md shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    {PERSONAL_INFO.fullName}
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                    BNSP &amp; AWS Certified Master Trainer
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    📍 {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              {/* Verified Credentials Box */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/90 border border-stone-200/70 dark:border-stone-800/70 mb-5 text-xs space-y-2">
                <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sertifikasi Profesional Utama:</span>
                </div>
                <ul className="space-y-1 text-stone-600 dark:text-stone-400 pl-5 list-disc marker:text-emerald-600">
                  <li>AWS Certified Solutions Architect - Professional</li>
                  <li>Certified Kubernetes Administrator (CKA - CNCF)</li>
                  <li>BNSP Master Trainer (Level 6)</li>
                  <li>Google Cloud Professional Architect</li>
                </ul>
              </div>

              {/* Core Competencies Chips */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Fokus Pelatihan &amp; Keahlian:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techStackBadges.slice(0, 6).map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 text-[11px] rounded-md bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 font-mono"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp Inquiry Link */}
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Respons rata-rata: <strong className="text-stone-800 dark:text-stone-200">&lt; 30 menit</strong>
                </span>
                <button
                  onClick={onOpenWhatsAppModal}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Chat Langsung</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Client Trust Section / Logos Ticker */}
        <div className="mt-16 pt-8 border-t border-stone-200/80 dark:border-stone-800/80">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-6">
            Telah Dipercaya Memberikan Pelatihan &amp; Konsultasi Oleh Tim Dari:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {CLIENT_LOGOS.map((client: any) => (
              <div
                key={client.name}
                className="p-3 rounded-xl bg-white/60 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 text-center flex flex-col items-center justify-center hover:border-stone-400 dark:hover:border-stone-700 transition-colors"
              >
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  {client.name}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {client.category || client.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
