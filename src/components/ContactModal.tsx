import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trainingType, setTrainingType] = useState('Workshop Public Speaking Pemula');
  const [participantCount, setParticipantCount] = useState('10 - 30 Peserta');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Halo Kak Alfi,\n\nSaya ${name} (${email}).\nTopik Pelatihan: ${trainingType}\nEstimasi Peserta: ${participantCount}\nCatatan / Kebutuhan: ${message}\n\nIngin berkonsultasi seputar jadwal pelatihan!`
    );

    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${waText}`, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#121212] border border-[#2A2A2A] rounded-[32px] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1F1F1F] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              aria-label="Tutup formulir kontak"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
              Konsultasi Pelatihan
            </h2>
            <p className="text-sm text-[#D7E2EA]/70 mb-6">
              Diskusikan kebutuhan workshop, seminar, atau sesi bimbingan bersama Alfi. Respon cepat via WhatsApp langsung.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-200 uppercase">Pesan Diteruskan!</h3>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  Rincian pelatihan Anda telah dialihkan ke WhatsApp Alfi. Kami akan segera merespons kebutuhan sesi Anda.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Tutup Jendela
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dimas Pratama"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Email / Instansi
                    </label>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dimas@instansi.id"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Topik Pelatihan
                    </label>
                    <select
                      value={trainingType}
                      onChange={(e) => setTrainingType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    >
                      <option>Workshop Public Speaking Pemula</option>
                      <option>Pelatihan Fasilitator &amp; Ice-Breaking</option>
                      <option>Komunikasi Efektif &amp; Presentasi Tim</option>
                      <option>Bimbingan 1-on-1 Mengatasi Gugup</option>
                      <option>Sesi Motivasi Belajar &amp; Kuliah Tamu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Estimasi Peserta
                    </label>
                    <select
                      value={participantCount}
                      onChange={(e) => setParticipantCount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    >
                      <option>1 Peserta (Private 1-on-1)</option>
                      <option>10 - 30 Peserta (Workshop Intim)</option>
                      <option>30 - 60 Peserta (Pelatihan Kelompok)</option>
                      <option>&gt; 60 Peserta (Seminar Terbuka)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                    Detail Kebutuhan &amp; Rencana Tanggal
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ceritakan gambaran peserta, target luaran pelatihan, serta perkiraan waktu pelaksanaan..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengarahkan...' : 'Kirim Konsultasi via WhatsApp'}</span>
                </button>
              </form>
            )}

            {/* Quick Contact Info */}
            <div className="mt-6 pt-6 border-t border-[#242424] flex flex-wrap items-center justify-between gap-3 text-xs text-[#D7E2EA]/60 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>+62 858-1324-5678</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
