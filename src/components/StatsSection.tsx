import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
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

export const StatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'evaluations'>('overview');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const topicDistribution = [
    { name: 'Public Speaking & Penguasaan Panggung (Artikulasi, Vokal & Gestur)', percentage: 40, batches: '10 Batch', color: 'from-[#B600A8] to-[#7621B0]' },
    { name: 'Komunikasi Efektif & Sinergi Dinamika Tim (TeamSync)', percentage: 30, batches: '7 Batch', color: 'from-[#7621B0] to-[#BE4C00]' },
    { name: 'Fasilitasi Workshop & Ice Breaking Interaktif (IceBreak Pro)', percentage: 20, batches: '5 Batch', color: 'from-[#BE4C00] to-amber-500' },
    { name: 'Mentoring 1-on-1: Presentasi, Sidang & Interview', percentage: 10, batches: '4 Batch', color: 'from-emerald-500 to-teal-600' },
  ];

  const evaluationBreakdown = [
    { metric: 'Kejelasan Materi & Kemudahan Memahami Materi Pelatihan', score: '4.96 / 5.00', percentage: 99.2 },
    { metric: 'Pencairan Suasana Kelas Hangat & Ramah (Tanpa Canggung)', score: '4.94 / 5.00', percentage: 98.8 },
    { metric: 'Simulasi Praktik Langsung & Feedback Membangun', score: '4.91 / 5.00', percentage: 98.2 },
    { metric: 'Peningkatan Keberanian & Rasa Percaya Diri Peserta', score: '4.93 / 5.00', percentage: 98.6 },
  ];

  return (
    <section
      id="statistik"
      className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header with subtle scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px', amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
              Rekam Jejak Sesi Pelatihan &bull; 2023 — 2026
            </span>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
            >
              Statistik
            </h2>
            <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
              Data dari evaluasi kepuasan peserta workshop pemula, kelas mini praktikum, dan sesi bimbingan 1-on-1 belajar koding.
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
        </motion.div>

        {/* Content Tabs with Scroll Stagger */}
        {activeTab === 'overview' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px', amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {TRAINING_STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                className="p-6 rounded-[28px] bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between h-full group"
              >
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
                    style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3.2rem)' }}
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
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'breakdown' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px', amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-[32px] bg-[#141414] border border-[#262626]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#B600A8]" />
                <span>Distribusi Volume Materi Pelatihan (Total 18+ Batch)</span>
              </h3>
              <span className="text-xs text-[#D7E2EA]/50 font-mono">
                Data 2023 — 2026
              </span>
            </div>

            <div className="space-y-6">
              {topicDistribution.map((topic, idx) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2"
                >
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
                      whileInView={{ width: `${topic.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 + idx * 0.08, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${topic.color} rounded-full`}
                    />
                  </div>
                </motion.div>
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
          </motion.div>
        )}

        {activeTab === 'evaluations' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px', amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-[32px] bg-[#141414] border border-[#262626]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Rata-rata Skor Kepuasan Peserta (CSAT): 4.91 / 5.00
                </h3>
                <p className="text-xs text-[#D7E2EA]/50 font-mono">
                  Berdasarkan kuesioner evaluasi 280+ peserta dari kelas pemula &amp; komunitas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evaluationBreakdown.map((item, idx) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 + idx * 0.08, ease: 'easeOut' }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
