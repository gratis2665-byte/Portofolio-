import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, HeartHandshake, Mic2, Compass } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { PERSONAL_INFO, WORK_EXPERIENCES, EDUCATION_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'story' | 'experience' | 'education'>('bio');
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
      className="relative min-h-screen w-full bg-white px-5 sm:px-8 md:px-10 py-24 overflow-hidden flex flex-col items-center justify-center select-none border-t border-[#E2E8F0]"
    >
      {/* Center Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4 select-none text-[#0F172A]"
            style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
          >
            Tentang Saya
          </h2>
          <p className="text-center font-mono uppercase text-xs sm:text-sm tracking-widest text-[#0284C7] font-semibold mb-8">
            {PERSONAL_INFO.fullName} &bull; {PERSONAL_INFO.title}
          </p>
        </FadeIn>

        {/* Character reveal text in warm, friendly Indonesian */}
        <div className="w-full max-w-4xl px-4 mb-10 text-center">
          <AnimatedText text="Halo! Saya Alfi, teman ngobrol dan fasilitator belajar kamu buat urusan bicara di depan umum, bangun rasa percaya diri, dan mencairkan suasana kaku. Saya percaya semua orang punya suara berharga yang layak didengar. Di kelas saya, suasananya dibuat seru dan santai tanpa rasa takut dihakimi." />
        </div>

        {/* Story Intro Banner: Dari Pemalu Jadi Pembicara */}
        <div className="w-full max-w-4xl p-6 sm:p-8 rounded-[28px] bg-[#F8FAFC] border border-[#BAE6FD] mb-10 text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white border border-[#BAE6FD] text-[#0284C7] shrink-0 hidden sm:block">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0284C7] block">
                Catatan Dari Alfi
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                &quot;Dulu, megang mic aja tangan saya gemetar hebat dan dingin kayak es.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                Saya tahu banget gimana rasanya punya ide bagus di kepala tapi terkunci di tenggorokan karena takut salah atau takut ditertawakan orang. Karena pernah ada di posisi itu, saya mendedikasikan waktu buat nemenin kamu lewat metode yang seru, manusiawi, dan tanpa tekanan. Public speaking bukan bakat turunan dari lahir—ini cuma soal kebiasaan dan latihan yang nyaman.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Detail Switcher */}
        <div className="w-full max-w-4xl bg-white border border-[#BAE6FD] rounded-[28px] p-6 sm:p-8 shadow-sm mb-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 border-b border-[#E2E8F0] pb-5">
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'bio'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'bg-[#F0F9FF] text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
            >
              Gaya Belajar &amp; Materi
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'bg-[#F0F9FF] text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
            >
              3 Janji di Kelas Alfi
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'bg-[#F0F9FF] text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
            >
              Pengalaman Kelas ({WORK_EXPERIENCES.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'bg-[#F0F9FF] text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
            >
              Pendidikan &amp; Sertifikasi
            </button>
          </div>

          {/* Tab 1: Cara Belajar & Keahlian */}
          {activeTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide">
                    Belajar Santai, Langsung Terasa Hasilnya
                  </h3>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    Belajar bicara di depan orang banyak itu mirip banget sama belajar naik sepeda: gak bakal bisa kalau cuma baca teori di buku tebal. Kamu harus langsung coba pegang setang dan gowes perlahan.
                  </p>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    Di sesi bareng saya, rasio belajarnya <strong>80% Praktik Langsung &amp; 20% Obrolan Konsep</strong>. Mulai dari trik atur napas saat deg-degan, cara buka obrolan di 30 detik pertama, sampai latihan presentasi santai bareng teman sekelas dengan masukan yang ramah dan saling dukung.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide">
                    Topik yang Paling Sering Dilatih
                  </h3>
                  <div className="space-y-2">
                    {PERSONAL_INFO.specializations.map((spec: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0284C7] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: 3 Janji di Kelas Alfi */}
          {activeTab === 'story' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A]">1. Bebas Rasa Malu &amp; Takut</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Gak ada istilah &apos;salah ngomong&apos; di kelas. Semua peserta ada di level belajar yang sama, saling semangati, dan gak ada yang bakal menertawakan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                    <Mic2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A]">2. Jadi Diri Sendiri</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Kamu gak perlu niru gaya motivator yang teriak-teriak kalau memang bukan gayamu. Kita cari gaya bicaramu yang paling natural dan nyaman.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A]">3. Pulang Bawa Percaya Diri</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Selesai sesi, kamu bakal punya langkah jelas buat dipraktikkan langsung pas meeting kantor, presentasi kampus, atau pimpin obrolan tim.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Pengalaman Kerja */}
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
                    className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-sky-300 transition-colors"
                  >
                    <div
                      onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-mono uppercase text-[#0284C7] font-semibold tracking-wider block">
                          {exp.period} &bull; {exp.type}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-wide">
                          {exp.role}
                        </h4>
                        <div className="text-xs text-[#64748B] font-mono mt-0.5">
                          <span>{exp.company}</span>
                          <span className="mx-1.5">&bull;</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <button className="self-end sm:self-center p-1.5 rounded-full bg-[#E2E8F0] text-[#334155] hover:bg-[#CBD5E1] cursor-pointer">
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
                        className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-3"
                      >
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono uppercase text-[#64748B] block font-semibold">
                            Hal yang sudah dicapai:
                          </span>
                          {exp.achievements.map((ach, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[#1E293B]">
                              <span className="text-[#0284C7] font-bold">&bull;</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[#0369A1]"
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

          {/* Tab 4: Pendidikan & Sertifikasi */}
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
                    className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-[#0F172A]">{edu.degree}</h4>
                      <span className="text-xs font-mono font-semibold text-[#0284C7]">{edu.year}</span>
                    </div>
                    <p className="text-xs text-[#64748B] font-mono">
                      {edu.institution} {edu.honors && <span>&bull; <strong className="text-emerald-600">{edu.honors}</strong></span>}
                    </p>
                    <p className="text-xs text-[#334155] leading-relaxed">{edu.description}</p>

                    {edu.certifications && edu.certifications.length > 0 && (
                      <div className="pt-3 border-t border-[#E2E8F0]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-2 font-semibold">
                          Sertifikasi &amp; Pelatihan Pendukung:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {edu.certifications.map((cert: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#0F172A]"
                            >
                              <span className="truncate block font-medium">{cert.name}</span>
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
            <ContactButton label="Ngobrol Bareng Alfi" onClick={scrollToContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
