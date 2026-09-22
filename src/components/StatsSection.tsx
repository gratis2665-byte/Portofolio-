import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Award,
  Building2,
  TrendingUp,
  CheckCircle,
  BarChart3,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { TRAINING_STATS } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const StatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'evaluations'>('overview');

  const topicDistribution = [
    { name: 'Cloud Native, Docker & Kubernetes (CKA)', percentage: 40, batches: '56 Batch', color: 'from-[#B600A8] to-[#7621B0]' },
    { name: 'Enterprise Fullstack (React 19, TypeScript, Clean Arch)', percentage: 30, batches: '42 Batch', color: 'from-[#7621B0] to-[#BE4C00]' },
    { name: 'Applied Generative AI, RAG & LLM Systems', percentage: 18, batches: '25 Batch', color: 'from-[#BE4C00] to-amber-500' },
    { name: 'Distributed Systems & Microservices Architecture', percentage: 12, batches: '17 Batch', color: 'from-emerald-500 to-teal-600' },
  ];

  const evaluationBreakdown = [
    { metric: 'Kejelasan Penyampaian & Pedagogi Fasilitator', score: '4.96 / 5.00', percentage: 99.2 },
    { metric: 'Relevansi Modul Lab Hands-on dengan Kasus Industri Riil', score: '4.94 / 5.00', percentage: 98.8 },
    { metric: 'Kesiapan & Stabilitas Lingkungan Lab Praktikum', score: '4.91 / 5.00', percentage: 98.2 },
    { metric: 'Bimbingan & Mentoring Interaktif Pasca Pelatihan', score: '4.89 / 5.00', percentage: 97.8 },
  ];

  return (
    <section
      id="statistik"
      className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
                Rekam Jejak Terverifikasi &bull; 2021 — 2026
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 90px)' }}
              >
                Statistik
              </h2>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Data terverifikasi dari evaluasi kepuasan peserta, tingkat kelulusan ujian kompetensi teknis, dan portofolio pelatihan in-house korporasi.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center p-1.5 rounded-full bg-[#181818] border border-[#2A2A2A] self-start md:self-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                    : 'text-[#D7E2EA]/60 hover:text-white'
                }`}
              >
                Ringkasan
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                    : 'text-[#D7E2EA]/60 hover:text-white'
                }`}
              >
                Distribusi
              </button>
              <button
                onClick={() => setActiveTab('evaluations')}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'evaluations'
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                    : 'text-[#D7E2EA]/60 hover:text-white'
                }`}
              >
                CSAT
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Content Tabs */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAINING_STATS.map((stat, idx) => (
              <FadeIn key={stat.id} delay={idx * 0.1} y={20}>
                <div className="p-6 rounded-[28px] bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-2xl bg-[#1D1D1D] text-[#B600A8] group-hover:text-white group-hover:bg-[#B600A8] transition-colors">
                      {stat.id === 'participants' && <Users className="w-5 h-5" />}
                      {stat.id === 'batches' && <Calendar className="w-5 h-5" />}
                      {stat.id === 'satisfaction' && <Award className="w-5 h-5" />}
                      {stat.id === 'clients' && <Building2 className="w-5 h-5" />}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                      Terverifikasi
                    </span>
                  </div>

                  <div>
                    <div
                      className="font-black text-white leading-none tracking-tight mb-2"
                      style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-[#D7E2EA] uppercase tracking-wider mb-2">
                      {stat.label}
                    </div>
                    <p className="text-xs text-[#D7E2EA]/50 leading-relaxed font-sans">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {activeTab === 'breakdown' && (
          <FadeIn delay={0} y={20}>
            <div className="p-6 sm:p-8 rounded-[32px] bg-[#141414] border border-[#262626]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#B600A8]" />
                  <span>Distribusi Volume Materi Pelatihan (Total 140+ Batch)</span>
                </h3>
                <span className="text-xs text-[#D7E2EA]/50 font-mono">
                  Data 2021 — 2026
                </span>
              </div>

              <div className="space-y-6">
                {topicDistribution.map((topic) => (
                  <div key={topic.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#D7E2EA]">
                        {topic.name}
                      </span>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-[#D7E2EA]/50">{topic.batches}</span>
                        <span className="font-bold text-white">
                          {topic.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-[#202020] rounded-full overflow-hidden p-0.5 border border-[#2C2C2C]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${topic.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#242424] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#D7E2EA]/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Praktikum Hands-on Lab Interaktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Studi Kasus Skenario Produksi Riil</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Konsultasi &amp; Code Review Pasca Pelatihan</span>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {activeTab === 'evaluations' && (
          <FadeIn delay={0} y={20}>
            <div className="p-6 sm:p-8 rounded-[32px] bg-[#141414] border border-[#262626]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wide">
                    Rata-rata Skor Kepuasan Peserta (CSAT): 4.94 / 5.00
                  </h3>
                  <p className="text-xs text-[#D7E2EA]/50 font-mono">
                    Berdasarkan kuesioner akhir 5.200+ peserta dari kelas In-House &amp; Bootcamp
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluationBreakdown.map((item) => (
                  <div
                    key={item.metric}
                    className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#282828]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#D7E2EA]">
                        {item.metric}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {item.score}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#242424] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
