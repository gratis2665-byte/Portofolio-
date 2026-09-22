import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  MessageSquare,
  Sparkles,
  Layers,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  FileSpreadsheet,
  Check,
} from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO, TRAINING_PROGRAMS } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const TrainingEstimator: React.FC = () => {
  const { isAuthenticated, logInquiry } = useGoogleSheets();
  const [selectedTopic, setSelectedTopic] = useState<string>(TRAINING_PROGRAMS[0].title);
  const [participantCount, setParticipantCount] = useState<string>('15-25 Orang');
  const [format, setFormat] = useState<string>('Onsite di Kantor Klien (Jabodetabek/Bandung)');
  const [duration, setDuration] = useState<string>('3 - 4 Hari Intensif');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [isSavedToSheets, setIsSavedToSheets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToSheets = async () => {
    if (!contactPerson && !companyName) {
      alert('Mohon isi nama PIC atau nama perusahaan.');
      return;
    }

    try {
      setIsSaving(true);
      await logInquiry({
        name: contactPerson || 'PIC Perusahaan',
        email: `${contactPerson?.toLowerCase().replace(/\s+/g, '') || 'pic'}@${companyName?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}.com`,
        company: companyName || 'Perusahaan',
        topic: selectedTopic,
        format,
        participants: participantCount,
        duration,
        message: `Kebutuhan training: ${selectedTopic} untuk ${participantCount}, format ${format}, durasi ${duration}.`,
        source: 'Kalkulator Pelatihan',
      });
      setIsSavedToSheets(true);
      setTimeout(() => setIsSavedToSheets(false), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const generateWhatsAppMessage = async () => {
    if (isAuthenticated) {
      handleSaveToSheets();
    }

    const text = `Halo Mas Alfi, salam kenal.

Saya ${contactPerson || '[Nama PIC]'} dari ${companyName || '[Nama Perusahaan / Institusi]'}.
Kami ingin berkonsultasi mengenai rencana program In-House Technical Training:
- Topik Pelatihan: ${selectedTopic}
- Estimasi Peserta: ${participantCount}
- Format Pelaksanaan: ${format}
- Estimasi Durasi: ${duration}

Mohon informasi ketersediaan jadwal Mas Alfi serta proposal silabus detailnya. Terima kasih.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="estimator" className="w-full bg-[#0C0C0C] py-20 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[36px] bg-[#141414] text-[#D7E2EA] p-6 sm:p-10 border border-[#2A2A2A] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Explanatory & Benefits */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B600A8] block">
                Kalkulator Kebutuhan Pelatihan
              </span>

              <h3 className="hero-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight">
                Rencanakan Pelatihan Tim Anda
              </h3>

              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed font-sans">
                Sesuaikan fokus materi, skala peserta, dan format pelaksanaan untuk mendapatkan estimasi kurikulum dan rekomendasi jadwal tercepat langsung bersama Alfi.
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-2.5 text-xs text-[#D7E2EA]/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Silabus disesuaikan dengan arsitektur &amp; stack perusahaan</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#D7E2EA]/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Termasuk sandbox lab cloud, repositori, &amp; sertifikat resmi</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#D7E2EA]/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sesi follow-up mentoring &amp; code review pasca pelatihan</span>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Form */}
            <div className="lg:col-span-7 bg-[#1A1A1A] p-6 sm:p-7 rounded-[28px] border border-[#2E2E2E] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                    Nama Anda (PIC / Lead):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian (Tech Lead)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                    Nama Perusahaan / Organisasi:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Bank Mandiri / Telkom"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                  Pilih Fokus Topik Pelatihan:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                >
                  {TRAINING_PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.title}>
                      {prog.title} ({prog.level})
                    </option>
                  ))}
                  <option value="Custom Training (Kombinasi Silabus Khusus)">
                    Custom Training (Kombinasi Silabus Khusus)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                    Peserta:
                  </label>
                  <select
                    value={participantCount}
                    onChange={(e) => setParticipantCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  >
                    <option value="5 - 15 Orang (Small Squad)">5 - 15 Orang</option>
                    <option value="15 - 25 Orang (Standard Batch)">15 - 25 Orang</option>
                    <option value="25 - 50 Orang (Large Cohort)">25 - 50 Orang</option>
                    <option value="50+ Orang (Department Wide)">50+ Orang</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                    Format:
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  >
                    <option value="Onsite di Kantor Klien">Onsite Kantor Klien</option>
                    <option value="Live Online Interactive (Zoom/Meet)">Online Interactive</option>
                    <option value="Hybrid (Kombinasi Onsite & Online)">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 block mb-1.5">
                    Durasi:
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#121212] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  >
                    <option value="2 Hari (Weekend / Fast Track)">2 Hari Workshop</option>
                    <option value="3 - 4 Hari Intensif">3 - 4 Hari Intensif</option>
                    <option value="6 - 8 Minggu Bootcamp">6 - 8 Minggu Bootcamp</option>
                  </select>
                </div>
              </div>

              {isSavedToSheets && (
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Estimasi rencana training berhasil dicatat ke Google Sheets!</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={generateWhatsAppMessage}
                  className="w-full sm:flex-1 py-3.5 rounded-full text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Estimasi via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isAuthenticated && (
                  <button
                    onClick={handleSaveToSheets}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#222222] hover:bg-[#2C2C2C] text-[#D7E2EA] border border-[#3A3A3A] font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                    title="Catat estimasi ini ke Google Sheets"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>{isSaving ? 'Menyimpan...' : 'Simpan ke Sheet'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
