import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ArrowUpRight, Sparkles, Send } from 'lucide-react';
import { PERSONAL_INFO, WHATSAPP_TEMPLATES } from '../data/portfolioData';

interface WhatsAppFloatingButtonProps {
  onOpenDirect: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenDirect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickSend = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Mini Popup Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#1c1c1a] border border-stone-200 dark:border-stone-800 shadow-2xl p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Alfi"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-stone-900" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Alfi Ramadhan
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                    Online • Respon Cepat
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                aria-label="Tutup jendela WhatsApp"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
              Ada kebutuhan pelatihan tim atau konsultasi arsitektur IT? Pilih topik di bawah untuk membuka chat:
            </p>

            <div className="space-y-1.5 mb-3">
              {WHATSAPP_TEMPLATES.slice(0, 3).map((tpl: any) => (
                <button
                  key={tpl.id}
                  onClick={() => handleQuickSend(tpl.message)}
                  className="w-full text-left p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/50 transition-all text-xs text-stone-800 dark:text-stone-200 group flex items-center justify-between cursor-pointer"
                >
                  <span className="font-medium truncate">{tpl.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onOpenDirect();
                setIsOpen(false);
              }}
              className="w-full py-2 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Kustomisasi Pesan di Formulir Kontak →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg hover:shadow-xl transition-all cursor-pointer group"
        aria-label="Chat WhatsApp Alfi"
        id="floating-whatsapp-trigger"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline">WhatsApp Alfi</span>
      </motion.button>
    </div>
  );
};
