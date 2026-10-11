import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex min-h-full items-center justify-center">
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
            className="relative w-full max-w-xl bg-white dark:bg-[#0F172A] border border-[#BAE6FD] dark:border-[#1E293B] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 text-[#0F172A] dark:text-[#F8FAFC] shadow-2xl shadow-sky-500/15 z-10 my-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-[#F0F9FF] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#E0F2FE] dark:hover:bg-[#334155] border border-[#BAE6FD] dark:border-[#334155] transition-colors cursor-pointer z-10"
              aria-label="Tutup formulir kontak"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container so top never cuts off on small screens */}
            <div className="overflow-y-auto pr-1 -mr-1 custom-scrollbar">
              <h2 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 text-[#0F172A] dark:text-[#F8FAFC] pr-10">
                Hubungi Alfi
              </h2>
              <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-6">
                Ceritakan rencana kelas, workshop kantor/kampus, atau sesi latihan privat yang kamu butuhkan. Nanti langsung kita bahas santai di WhatsApp.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#0284C7] mx-auto" />
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase">Pesan Sudah Disiapkan!</h3>
                  <p className="text-xs text-[#0369A1] dark:text-[#38BDF8] leading-relaxed">
                    Chat WhatsApp sudah otomatis terbuka di aplikasi kamu. Alfi akan segera membalas pesanmu.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Tutup Jendela
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                        Nama Kamu
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Misal: Dimas Pratama"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:bg-white dark:focus:bg-[#0F172A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                        Email / Nama Tim
                      </label>
                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dimas@gmail.com / Tim HR"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:bg-white dark:focus:bg-[#0F172A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                        Topik yang Diminati
                      </label>
                      <select
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-sm text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0284C7] focus:bg-white dark:focus:bg-[#0F172A] transition-colors"
                      >
                        <option>Workshop Public Speaking Pemula</option>
                        <option>Pelatihan Fasilitator &amp; Ice-Breaking</option>
                        <option>Komunikasi Efektif &amp; Presentasi Tim</option>
                        <option>Bimbingan 1-on-1 Mengatasi Gugup</option>
                        <option>Sesi Motivasi &amp; Sharing Santai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-medium tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                        Perkiraan Jumlah Peserta
                      </label>
                      <select
                        value={participantCount}
                        onChange={(e) => setParticipantCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-sm text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0284C7] focus:bg-white dark:focus:bg-[#0F172A] transition-colors"
                      >
                        <option>1 Orang (Mentoring Privat 1-on-1)</option>
                        <option>10 - 30 Orang (Kelas Workshop Intim)</option>
                        <option>30 - 60 Orang (Kelas Kelompok / Tim)</option>
                        <option>&gt; 60 Orang (Seminar Panggung / Terbuka)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#475569] dark:text-[#94A3B8] mb-1">
                      Cerita Kebutuhan &amp; Perkiraan Waktu
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ceritakan tentang peserta, target kelas yang diinginkan, atau perkiraan tanggalnya..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:bg-white dark:focus:bg-[#0F172A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-sky-600/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSubmitting ? 'Mengarahkan...' : 'Kirim Pesan ke WhatsApp'}</span>
                  </button>
                </form>
              )}

              {/* Quick Contact Info */}
              <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>+62 858-1324-5678</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
