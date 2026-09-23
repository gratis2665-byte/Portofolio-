import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, X, ArrowRight } from 'lucide-react';
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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-3xl bg-white border border-[#BAE6FD] rounded-[32px] p-6 sm:p-8 text-[#0F172A] shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            aria-label="Tutup detail materi"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-[#0284C7] tracking-widest font-semibold block mb-1">
              Rincian Modul &bull; {program.level} Level
            </span>
            <h3 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0F172A]">
              {program.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed font-sans">
              {program.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#334155]">
              <Clock className="w-4 h-4 text-[#0284C7]" />
              <span>Waktu Sesi: {program.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-[#334155]">
              <Users className="w-4 h-4 text-[#0284C7]" />
              <span>Peserta: {program.targetAudience}</span>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
              Langkah Belajar &amp; Simulasi:
            </h4>
            {program.syllabus.map((mod) => (
              <div
                key={mod.moduleNumber}
                className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {mod.moduleNumber}
                  </span>
                  <h5 className="text-sm font-bold text-[#0F172A]">{mod.title}</h5>
                </div>
                <div className="pl-8 space-y-1.5 text-xs text-[#475569]">
                  <div className="flex flex-wrap gap-1.5">
                    {mod.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[11px] text-[#334155]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-[#0369A1]">
                    <strong className="text-[#0284C7]">Praktik Langsung:</strong> {mod.handsOnLab}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              Format: Tatap muka langsung di kantor/kampus atau kelas online interaktif.
            </p>
            <button
              onClick={() => {
                onClose();
                onInquire(program.title);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white cursor-pointer transition-all bg-[#0284C7] hover:bg-[#0369A1] shadow-xs hover:shadow-md hover:scale-102"
            >
              Tanya Jadwal &amp; Obrolan Kelas
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
        `Halo Alfi, saya mau tanya-tanya soal sesi pelatihan: ${title}. Boleh minta info jadwal dan penjelasannya?`
      );
      window.open(`https://wa.me/6281289214470?text=${msg}`, '_blank');
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-white text-[#0F172A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none relative z-0 border-t border-[#E2E8F0]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
              Kelas Santai &bull; Workshop Seru &bull; Latihan Bareng
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-[#0F172A]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Kelas Pelatihan
            </h2>
            <p className="text-[#475569] text-xs sm:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
              Pilihan kelas yang bisa disesuaikan dengan kebutuhan tim kantor, organisasi kampus, atau sesi santai komunitasmu.
            </p>
          </div>
        </FadeIn>

        {/* Vertical List of Programs */}
        <div className="flex flex-col border-t border-[#E2E8F0]">
          {TRAINING_PROGRAMS.map((program, index) => {
            const formattedNumber = String(index + 1).padStart(2, '0');
            return (
              <FadeIn key={program.id} delay={index * 0.1} y={30}>
                <div
                  onClick={() => setSelectedProgram(program)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 border-b border-[#E2E8F0] gap-4 sm:gap-8 cursor-pointer hover:bg-[#F8FAFC] transition-colors rounded-2xl px-3 sm:px-6"
                >
                  {/* Left Number */}
                  <div
                    className="font-black text-[#0284C7] leading-none shrink-0 min-w-[80px] sm:min-w-[120px] group-hover:text-[#0369A1] transition-colors"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                  >
                    {formattedNumber}
                  </div>

                  {/* Right Name + Description */}
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                        {program.duration}
                      </span>
                    </div>

                    <h3
                      className="font-bold uppercase text-[#0F172A] mb-2 leading-tight tracking-wide group-hover:text-[#0284C7] transition-colors"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
                    >
                      {program.title}
                    </h3>
                    <p className="text-[#475569] leading-relaxed max-w-2xl text-xs sm:text-sm font-sans">
                      {program.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7] group-hover:translate-x-1 transition-transform">
                      <span>Lihat Rincian &amp; Praktik Kelas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* 5th Option: Mentoring 1-on-1 */}
          <FadeIn delay={0.4} y={30}>
            <div
              onClick={() => handleInquireClick('Mentoring 1-on-1: Persiapan Sidang, Pitching & Interview')}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 border-b border-[#E2E8F0] gap-4 sm:gap-8 cursor-pointer hover:bg-[#F8FAFC] transition-colors rounded-2xl px-3 sm:px-6"
            >
              <div
                className="font-black text-[#0284C7] leading-none shrink-0 min-w-[80px] sm:min-w-[120px] group-hover:text-[#0369A1] transition-colors"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                05
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                    Mentoring Personal &bull; Fleksibel
                  </span>
                </div>
                <h3
                  className="font-bold uppercase text-[#0F172A] mb-2 leading-tight tracking-wide group-hover:text-[#0284C7] transition-colors"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
                >
                  Bimbingan 1-on-1: Sidang, Pitching &amp; Wawancara Kerja
                </h3>
                <p className="text-[#475569] leading-relaxed max-w-2xl text-xs sm:text-sm font-sans">
                  Sesi privat bedah materi presentasi, latihan intonasi vokal, simulasi tanya-jawab sulit, dan tips percaya diri personal sebelum tampil penting.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7] group-hover:translate-x-1 transition-transform">
                  <span>Konsultasikan Sesi Privat</span>
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
