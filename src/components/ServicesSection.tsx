import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, BookOpen, Clock, Users, CheckCircle, X, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { TRAINING_PROGRAMS } from '../data/portfolioData';

interface ProgramDetailModalProps {
  program: typeof TRAINING_PROGRAMS[0] | null;
  onClose: () => void;
  onInquire: (title: string) => void;
}

const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onInquire,
}) => {
  if (!program) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#141414] border border-[#2E2E2E] rounded-[32px] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#202020] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            aria-label="Tutup detail program"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-[#B600A8] tracking-widest block mb-1">
              Silabus Lengkap &bull; {program.level} Level
            </span>
            <h3 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {program.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-2 leading-relaxed font-sans">
              {program.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#1A1A1A] border border-[#262626] mb-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Durasi: {program.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B600A8]" />
              <span>Target: {program.targetAudience}</span>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/60">
              Struktur Modul &amp; Hands-On Lab:
            </h4>
            {program.syllabus.map((mod) => (
              <div
                key={mod.moduleNumber}
                className="p-4 rounded-2xl bg-[#1B1B1B] border border-[#282828] space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {mod.moduleNumber}
                  </span>
                  <h5 className="text-sm font-bold text-white">{mod.title}</h5>
                </div>
                <div className="pl-8 space-y-1.5 text-xs text-[#D7E2EA]/80">
                  <div className="flex flex-wrap gap-1.5">
                    {mod.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#242424] text-[11px] text-[#D7E2EA]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 p-2.5 rounded-xl bg-[#222222] border border-[#2D2D2D] text-[11px] text-emerald-300">
                    <strong className="text-emerald-400">Lab Praktikum:</strong> {mod.handsOnLab}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#242424]">
            <p className="text-xs text-[#D7E2EA]/60">
              Format: Onsite In-House Training atau Online Workshop Interaktif.
            </p>
            <button
              onClick={() => {
                onClose();
                onInquire(program.title);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-white cursor-pointer transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
            >
              Diskusi Jadwal &amp; Proposal Kelas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const ServicesSection: React.FC<{ onInquire?: (title: string) => void }> = ({
  onInquire,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<typeof TRAINING_PROGRAMS[0] | null>(null);

  const handleInquireClick = (title: string) => {
    if (onInquire) {
      onInquire(title);
    } else {
      const msg = encodeURIComponent(
        `Halo Mas Alfi, saya tertarik dengan silabus dan proposal in-house training: ${title}. Mohon informasi jadwal dan penawarannya.`
      );
      window.open(`https://wa.me/6281289214470?text=${msg}`, '_blank');
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0C0C0C]/50 block mb-2">
              Pelatihan Korporasi &bull; In-House Bootcamp &bull; Konsultasi Arsitektur
            </span>
            <h2
              className="text-[#0C0C0C] font-black uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
            >
              Layanan
            </h2>
          </div>
        </FadeIn>

        {/* Vertical List of Programs */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {TRAINING_PROGRAMS.map((program, index) => {
            const formattedNumber = String(index + 1).padStart(2, '0');
            return (
              <FadeIn key={program.id} delay={index * 0.1} y={30}>
                <div
                  onClick={() => setSelectedProgram(program)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-4 sm:gap-8 md:gap-12 cursor-pointer hover:bg-[rgba(12,12,12,0.02)] transition-colors rounded-xl px-2 sm:px-4"
                >
                  {/* Left Number */}
                  <div
                    className="font-black text-[#0C0C0C] leading-none shrink-0 min-w-[100px] sm:min-w-[140px] md:min-w-[180px] group-hover:text-[#B600A8] transition-colors"
                    style={{ fontSize: 'clamp(2.8rem, 8vw, 120px)' }}
                  >
                    {formattedNumber}
                  </div>

                  {/* Right Name + Description Stacked */}
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#0C0C0C]/60 bg-[rgba(12,12,12,0.06)] px-2 py-0.5 rounded-md">
                        {program.duration}
                      </span>
                      {program.popular && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#B600A8] bg-[#B600A8]/10 px-2 py-0.5 rounded-md font-semibold">
                          Paling Diminati
                        </span>
                      )}
                    </div>

                    <h3
                      className="font-medium uppercase text-[#0C0C0C] mb-2 md:mb-3 leading-tight tracking-tight group-hover:text-[#7621B0] transition-colors"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    >
                      {program.title}
                    </h3>
                    <p
                      className="font-light text-[#0C0C0C]/70 leading-relaxed max-w-2xl text-xs sm:text-sm md:text-base font-sans"
                    >
                      {program.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#B600A8] group-hover:translate-x-1 transition-transform">
                      <span>Buka Detail Silabus &amp; Lab Praktikum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* 5th Discipline: Architecture Consulting */}
          <FadeIn delay={0.4} y={30}>
            <div
              onClick={() => handleInquireClick('Konsultasi Arsitektur IT & Audit FinOps')}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-4 sm:gap-8 md:gap-12 cursor-pointer hover:bg-[rgba(12,12,12,0.02)] transition-colors rounded-xl px-2 sm:px-4"
            >
              <div
                className="font-black text-[#0C0C0C] leading-none shrink-0 min-w-[100px] sm:min-w-[140px] md:min-w-[180px] group-hover:text-[#B600A8] transition-colors"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 120px)' }}
              >
                05
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#0C0C0C]/60 bg-[rgba(12,12,12,0.06)] px-2 py-0.5 rounded-md">
                    Konsultasi &amp; Advisory
                  </span>
                </div>
                <h3
                  className="font-medium uppercase text-[#0C0C0C] mb-2 md:mb-3 leading-tight tracking-tight group-hover:text-[#7621B0] transition-colors"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  Modernisasi Arsitektur IT &amp; Audit FinOps
                </h3>
                <p className="font-light text-[#0C0C0C]/70 leading-relaxed max-w-2xl text-xs sm:text-sm md:text-base font-sans">
                  Konsultasi independen perancangan arsitektur microservices, migrasi cloud AWS/GCP, audit keamanan sistem, dan optimasi biaya infrastruktur Kubernetes hingga 35%.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#B600A8] group-hover:translate-x-1 transition-transform">
                  <span>Konsultasikan Kebutuhan Sistem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onInquire={handleInquireClick}
      />
    </section>
  );
};
