import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
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
    { name: 'Public Speaking & Percaya Diri di Panggung', percentage: 40, batches: '10 Batch', color: 'from-[#0284C7] to-[#38BDF8]' },
    { name: 'Komunikasi Efektif & Kekompakan Tim (TeamSync)', percentage: 30, batches: '7 Batch', color: 'from-[#0369A1] to-[#0EA5E9]' },
    { name: 'Ice Breaking Seru & Fasilitasi Interaktif (IceBreak Pro)', percentage: 20, batches: '5 Batch', color: 'from-sky-500 to-cyan-400' },
    { name: 'Mentoring 1-on-1: Presentasi, Sidang & Wawancara', percentage: 10, batches: '4 Batch', color: 'from-emerald-500 to-teal-500' },
  ];

  const evaluationBreakdown = [
    { metric: 'Penyampaian materi jelas dan mudah dipraktikkan', score: '4.96 / 5.00', percentage: 99.2 },
    { metric: 'Suasana kelas santai, seru, dan bebas canggung', score: '4.94 / 5.00', percentage: 98.8 },
    { metric: 'Banyak simulasi langsung dan masukan yang membangun', score: '4.91 / 5.00', percentage: 98.2 },
    { metric: 'Peserta merasa lebih berani dan percaya diri', score: '4.93 / 5.00', percentage: 98.6 },
  ];

  return (
    <section
      id="statistik"
      className="w-full bg-[#F0F7FF]/50 py-24 px-5 sm:px-8 md:px-10 border-t border-[#E2E8F0] select-none relative z-10"
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
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
              Cerita &bull; Jejak Perjalanan
            </span>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
            >
              Pengalaman Kelas
            </h2>
            <p className="text-[#475569] text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
              Rangkuman seru dari sesi workshop, kelas santai, dan latihan bareng teman-teman peserta.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white border border-[#BAE6FD] self-start md:self-auto shadow-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Ringkasan
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'breakdown'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Topik Materi
            </button>
            <button
              onClick={() => setActiveTab('evaluations')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'evaluations'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Ulasan Peserta
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
                className="p-6 rounded-[28px] bg-white border border-[#E2E8F0] hover:border-sky-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div
                    className="font-black text-[#0284C7] leading-none tracking-tight mb-3"
                    style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] uppercase tracking-wide mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed font-sans">
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
            className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#E2E8F0] shadow-sm"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] uppercase tracking-wide">
                Porsi Materi yang Sering Dibawakan (Total 18+ Batch)
              </h3>
              <span className="text-xs text-[#64748B] font-mono">
                2023 — Sekarang
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
                    <span className="font-semibold text-[#1E293B]">
                      {topic.name}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#64748B]">{topic.batches}</span>
                      <span className="font-bold text-[#0F172A]">
                        {topic.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${topic.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 + idx * 0.08, ease: 'easeOut' }}
                      className="h-full bg-[#0284C7] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#475569]">
              <div>
                <strong className="text-[#0F172A] block mb-1">Praktik Langsung</strong>
                <span>80% waktu dipakai untuk simulasi dan latihan nyata.</span>
              </div>
              <div>
                <strong className="text-[#0F172A] block mb-1">Skenario Kehidupan Nyata</strong>
                <span>Contoh kasus nyata saat presentasi kuliah maupun di kantor.</span>
              </div>
              <div>
                <strong className="text-[#0F172A] block mb-1">Masukan Hangat</strong>
                <span>Feedback personal tanpa bikin peserta merasa dihakimi.</span>
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
            className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#E2E8F0] shadow-sm"
          >
            <div className="mb-6 pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Rating Kepuasan Rata-rata: <span className="text-[#0284C7]">4.91 / 5.0</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Dari ulasan jujur 280+ peserta yang pernah ikutan workshop dan sesi latihan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evaluationBreakdown.map((item, idx) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#1E293B]">
                      {item.metric}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0284C7]">
                      {item.score}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 + idx * 0.08, ease: 'easeOut' }}
                      className="h-full bg-[#0284C7] rounded-full"
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
