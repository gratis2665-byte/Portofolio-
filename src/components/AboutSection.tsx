import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { PERSONAL_INFO, WORK_EXPERIENCES, EDUCATION_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience' | 'education'>('bio');
  const [expandedExpId, setExpandedExpId] = useState<string | null>('exp-1');

  const scrollToContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Center Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Heading in Indonesian */}
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4 select-none"
            style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
          >
            Tentang Saya
          </h2>
          <p className="text-center font-mono uppercase text-xs sm:text-sm tracking-widest text-[#D7E2EA]/60 mb-10">
            {PERSONAL_INFO.fullName} &bull; {PERSONAL_INFO.title}
          </p>
        </FadeIn>

        {/* Scroll-driven character reveal text in Indonesian */}
        <div className="w-full max-w-4xl px-4 mb-12 text-center">
          <AnimatedText text="Sebagai seorang trainer dan fasilitator pelatihan, saya berfokus mendampingi peserta membangun keterampilan komunikasi efektif, teknik presentasi memikat, dan rasa percaya diri berbicara di depan umum secara ramah dan aplikatif. Telah mendampingi 280+ peserta, saya memadukan simulasi interaktif dengan 100% latihan langsung agar setiap sesi pelatihan terasa dinamis, bermakna, dan menyenangkan." />
        </div>

        {/* Interactive Detail Switcher */}
        <div className="w-full max-w-4xl bg-[#141414] border border-[#242424] rounded-[28px] p-6 sm:p-8 backdrop-blur-md mb-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 border-b border-[#242424] pb-5">
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'bio'
                  ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-lg shadow-[#B600A8]/20'
                  : 'bg-[#1C1C1C] text-[#D7E2EA]/70 hover:text-white hover:bg-[#262626]'
              }`}
            >
              Pedagogi &amp; Keahlian
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-lg shadow-[#B600A8]/20'
                  : 'bg-[#1C1C1C] text-[#D7E2EA]/70 hover:text-white hover:bg-[#262626]'
              }`}
            >
              Pengalaman Kerja ({WORK_EXPERIENCES.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-lg shadow-[#B600A8]/20'
                  : 'bg-[#1C1C1C] text-[#D7E2EA]/70 hover:text-white hover:bg-[#262626]'
              }`}
            >
              Pendidikan &amp; Lisensi
            </button>
          </div>

          {/* Tab 1: Pedagogi & Keahlian */}
          {activeTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B600A8]" />
                    <span>Metode Pelatihan Praktis &amp; Partisipatif</span>
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/80 leading-relaxed">
                    Saya meyakini bahwa keterampilan komunikasi dan berbicara di depan umum dapat dilatih oleh siapa saja melalui lingkungan belajar yang aman secara psikologis, ramah, dan bebas canggung. Sesi pelatihan mengadopsi rasio <strong>80% Praktik &amp; Simulasi Nyata, 20% Pemahaman Konsep</strong>.
                  </p>
                  <p className="text-sm text-[#D7E2EA]/80 leading-relaxed">
                    Setiap modul dirancang aplikatif—mulai dari latihan pernapasan diafragma, teknik menyusun poin presentasi lugas, hingga roleplay skenario kerja tim sehari-hari dengan umpan balik apresiatif langsung.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#7621B0]" />
                    <span>Area Spesialisasi Utama</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PERSONAL_INFO.specializations.map((spec: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1A1A1A] border border-[#282828] text-xs text-[#D7E2EA]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Pengalaman Kerja */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-left"
            >
              {WORK_EXPERIENCES.map((exp) => {
                const isExpanded = expandedExpId === exp.id;
                return (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-[#191919] border border-[#282828] hover:border-[#3A3A3A] transition-colors"
                  >
                    <div
                      onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-mono uppercase text-[#B600A8] tracking-wider block">
                          {exp.period} &bull; {exp.type}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#D7E2EA]/60 font-mono mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                          <span>&bull;</span>
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <button className="self-end sm:self-center p-1.5 rounded-full bg-[#242424] text-[#D7E2EA] hover:bg-[#303030]">
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-[#262626] space-y-3"
                      >
                        <p className="text-xs sm:text-sm text-[#D7E2EA]/80 leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono uppercase text-[#D7E2EA]/50 block">
                            Pencapaian Kunci:
                          </span>
                          {exp.achievements.map((ach, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[#D7E2EA]/90">
                              <span className="text-emerald-400 font-bold">&bull;</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-[#222222] text-[10px] font-mono text-[#D7E2EA]/70"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Tab 3: Pendidikan & Lisensi */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="space-y-4">
                {EDUCATION_DATA.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-[#191919] border border-[#282828] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                      <span className="text-xs font-mono text-[#B600A8]">{edu.year}</span>
                    </div>
                    <p className="text-xs text-[#D7E2EA]/70 font-mono">
                      {edu.institution} {edu.honors && <span>&bull; <strong className="text-emerald-400">{edu.honors}</strong></span>}
                    </p>
                    <p className="text-xs text-[#D7E2EA]/80 leading-relaxed">{edu.description}</p>

                    {edu.certifications && edu.certifications.length > 0 && (
                      <div className="pt-3 border-t border-[#262626]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/60 block mb-2">
                          Sertifikasi &amp; Lisensi Resmi:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {edu.certifications.map((cert: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="flex items-center gap-2 p-2 rounded-xl bg-[#202020] border border-[#2B2B2B] text-xs text-[#D7E2EA]"
                            >
                              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="truncate">{cert.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Contact CTA Button */}
        <div className="mt-4">
          <FadeIn delay={0.2} y={20}>
            <ContactButton label="Hubungi Alfi" onClick={scrollToContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
