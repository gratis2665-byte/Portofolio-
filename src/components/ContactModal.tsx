import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Phone, MapPin, CheckCircle2, MessageSquare, FileSpreadsheet } from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGoogleSheets?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenGoogleSheets,
}) => {
  const { isAuthenticated, logInquiry, activeSpreadsheet } = useGoogleSheets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('3D Modeling & Rendering');
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isAuthenticated) {
      await logInquiry({
        name,
        email,
        company: '3D Project Client',
        topic: projectType,
        format: budget,
        message,
        source: '3D Portfolio Contact Form',
      });
    }

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Hi Alfi,\n\nI'm ${name} (${email}).\nProject Type: ${projectType}\nBudget Range: ${budget}\nMessage: ${message}\n\nLet's collaborate!`
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
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
              Let&apos;s Build Together
            </h2>
            <p className="text-sm text-[#D7E2EA]/70 mb-6">
              Have an ambitious 3D project or want to collaborate? Drop a message below or contact Alfi directly.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-200 uppercase">Message Forwarded!</h3>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  Your project details have been prepared for WhatsApp chat. We will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Service
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    >
                      <option>3D Modeling</option>
                      <option>3D Rendering & Lighting</option>
                      <option>Motion Design</option>
                      <option>Visual Branding</option>
                      <option>Web Design & Dev</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                      Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors"
                    >
                      <option>&lt; $1,000</option>
                      <option>$1,000 - $3,000</option>
                      <option>$3,000 - $7,000</option>
                      <option>&gt; $7,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/70 mb-1">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your vision, timeline, and deliverables..."
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
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry via WhatsApp'}</span>
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
              {onOpenGoogleSheets && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenGoogleSheets();
                  }}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Sheets Sync</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
