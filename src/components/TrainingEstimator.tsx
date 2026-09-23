import React, { useState } from 'react';
import {
  MessageSquare,
  ArrowRight,
  FileSpreadsheet,
  Check,
} from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO, TRAINING_PROGRAMS } from '../data/portfolioData';

export const TrainingEstimator: React.FC = () => {
  const { isAuthenticated, logInquiry } = useGoogleSheets();
  const [selectedTopic, setSelectedTopic] = useState<string>(TRAINING_PROGRAMS[0].title);
  const [participantCount, setParticipantCount] = useState<string>('15 - 25 Orang');
  const [format, setFormat] = useState<string>('Tatap Muka Langsung (Onsite)');
  const [duration, setDuration] = useState<string>('1 Hari Workshop Penuh');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [isSavedToSheets, setIsSavedToSheets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToSheets = async () => {
    if (!contactPerson && !companyName) {
      alert('Mohon isi nama atau nama tim/instansi.');
      return;
    }

    try {
      setIsSaving(true);
      await logInquiry({
        name: contactPerson || 'PIC',
        email: `${contactPerson?.toLowerCase().replace(/\s+/g, '') || 'pic'}@${companyName?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}.com`,
        company: companyName || 'Pribadi/Tim',
        topic: selectedTopic,
        format,
        participants: participantCount,
        duration,
        message: `Rencana kelas: ${selectedTopic} untuk ${participantCount}, format ${format}, durasi ${duration}.`,
        source: 'Perencana Kelas',
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

    const text = `Halo Alfi!

Saya ${contactPerson || '[Nama Kamu]'} dari ${companyName || '[Nama Kantor / Kampus / Komunitas]'}.
Saya mau tanya-tanya seputar rencana kelas pelatihan:
- Topik: ${selectedTopic}
- Perkiraan Peserta: ${participantCount}
- Format: ${format}
- Rencana Durasi: ${duration}

Kira-kira jadwal terdekat kapan yang tersedia? Terima kasih banyak!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="estimator" className="w-full bg-white py-20 px-5 sm:px-8 md:px-10 border-t border-[#E2E8F0] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[36px] bg-[#F0F9FF] text-[#0F172A] p-6 sm:p-10 border border-[#BAE6FD] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Explanatory & Benefits */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-semibold block">
                Perencana Kelas &bull; Simulasi Waktu
              </span>

              <h3 className="hero-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight">
                Rencanakan Kelas Bareng Alfi
              </h3>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                Pilih topik, jumlah peserta, dan format pelaksanaan yang pas buat tim kamu. Nanti langsung dapat rekomendasi jadwal dan gambaran kelasnya.
              </p>

              <div className="space-y-2.5 pt-3 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                  <span>Materi disesuaikan dengan kebutuhan nyata tim</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                  <span>Banyak latihan simulasi interaktif tanpa canggung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                  <span>Masukan hangat dan bimbingan setelah kelas selesai</span>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-[28px] border border-[#BAE6FD] shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Nama Kamu:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Kantor / Kampus / Komunitas:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: BEM Kampus / Tim Startup"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                  Pilih Fokus Topik:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                >
                  {TRAINING_PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.title}>
                      {prog.title}
                    </option>
                  ))}
                  <option value="Kelas Khusus (Custom Sesuai Kebutuhan)">
                    Kelas Khusus (Custom Sesuai Kebutuhan)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Peserta:
                  </label>
                  <select
                    value={participantCount}
                    onChange={(e) => setParticipantCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  >
                    <option value="5 - 15 Orang">5 - 15 Orang</option>
                    <option value="15 - 25 Orang">15 - 25 Orang</option>
                    <option value="25 - 50 Orang">25 - 50 Orang</option>
                    <option value="50+ Orang">50+ Orang</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Format:
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  >
                    <option value="Tatap Muka Langsung (Onsite)">Onsite / Langsung</option>
                    <option value="Online Interaktif (Zoom / Meet)">Online Interaktif</option>
                    <option value="Hybrid (Campuran)">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Durasi:
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  >
                    <option value="Setengah Hari (3-4 Jam)">Setengah Hari</option>
                    <option value="1 Hari Workshop Penuh">1 Hari Penuh</option>
                    <option value="2 Hari Kelas Mendalam">2 Hari Kelas</option>
                  </select>
                </div>
              </div>

              {isSavedToSheets && (
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-[#0369A1] text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>Rencana kelas berhasil dicatat ke Google Sheets!</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={generateWhatsAppMessage}
                  className="w-full sm:flex-1 py-3.5 rounded-full text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer bg-[#0284C7] hover:bg-[#0369A1] shadow-xs hover:shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Rencana ke WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isAuthenticated && (
                  <button
                    onClick={handleSaveToSheets}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white hover:bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                    title="Catat rencana ini ke Google Sheets"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#0284C7]" />
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
