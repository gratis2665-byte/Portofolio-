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
      {/* 1. Top-Left Decorative 3D Moon */}
      <div className="absolute top-[3%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Elemen 3D Moon"
            className="w-[110px] sm:w-[150px] md:w-[200px] h-auto object-contain select-none opacity-80"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* 2. Bottom-Left Decorative 3D Object */}
      <div className="absolute bottom-[4%] left-[2%] sm:left-[5%] md:left-[8%] z-0 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="Elemen 3D Shape"
            className="w-[90px] sm:w-[130px] md:w-[170px] h-auto object-contain select-none opacity-80"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* 3. Top-Right Decorative 3D Lego Icon */}
      <div className="absolute top-[3%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Elemen 3D Lego"
            className="w-[110px] sm:w-[150px] md:w-[200px] h-auto object-contain select-none opacity-80"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right Decorative 3D Group */}
      <div className="absolute bottom-[4%] right-[2%] sm:right-[5%] md:right-[8%] z-0 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="Elemen 3D Group"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none opacity-80"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Heading in Indonesian */}
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4 select-none"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Tentang Saya
          </h2>
          <p className="text-center font-mono uppercase text-xs sm:text-sm tracking-widest text-[#D7E2EA]/60 mb-10">
            {PERSONAL_INFO.fullName} &bull; {PERSONAL_INFO.title}
          </p>
        </FadeIn>

        {/* Scroll-driven character reveal text in Indonesian */}
        <div className="w-full max-w-4xl px-4 mb-12 text-center">
          <AnimatedText text="Dengan lebih dari 8 tahun pengalaman sebagai Spesialis IT dan Principal Technical Trainer, saya berfokus pada arsitektur cloud enterprise, sistem terdistribusi, dan pengembangan talenta engineering. Telah melatih lebih dari 5.200 engineer di 45+ korporasi, saya memadukan keahlian teknis mendalam dengan pedagogi terstruktur untuk membangun tim berkinerja tinggi." />
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
                    <span>Filosofi Pengajaran Hands-On</span>
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/80 leading-relaxed">
                    Saya meyakini bahwa teknologi terbaik adalah teknologi yang dapat dipahami, diimplementasikan, dan dipelihara secara mandiri oleh tim Anda. Sesi pelatihan mengadopsi rasio <strong>80% Hands-on Lab &amp; 20% Arsitektur Konsep</strong>.
                  </p>
                  <p className="text-sm text-[#D7E2EA]/80 leading-relaxed">
                    Setiap modul dirancang dari skenario produksi nyata—bukan sekadar tutorial dasar—mencakup simulasi kegagalan sistem, security best practices, dan benchmarking performa tinggi.
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
