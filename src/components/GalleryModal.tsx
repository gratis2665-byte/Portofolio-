import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, Building } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GalleryModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ photo, onClose }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    if (photo) {
      setImgSrc(photo.imageUrl);
      setImgLoading(true);
    }
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [photo, onClose]);

  if (!photo || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop - Solid Dark Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white border border-[#BAE6FD] text-[#0F172A] shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0F172A]/75 hover:bg-[#0F172A] text-white transition-colors z-20 cursor-pointer shadow-md"
            aria-label="Tutup foto"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Image Container */}
          <div className="relative w-full h-80 sm:h-96 md:h-[460px] bg-slate-100 flex items-center justify-center overflow-hidden">
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-[#0284C7] animate-spin" />
              </div>
            )}
            <img
              src={imgSrc || photo.imageUrl}
              alt={photo.title}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                if (photo.fallbackUrl && imgSrc !== photo.fallbackUrl) {
                  setImgSrc(photo.fallbackUrl);
                } else {
                  setImgSrc('https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=1200&q=80');
                }
                setImgLoading(false);
              }}
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* Meta Information & Highlights */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-semibold block mb-1">
                  Kategori: {photo.category.toUpperCase()}
                </span>
                <h3 className="hero-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0F172A]">
                  {photo.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{photo.participantCount} Peserta</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#475569]">
                <Building className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span><strong className="text-[#0F172A]">Klien / Mitra:</strong> {photo.client}</span>
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <MapPin className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span><strong className="text-[#0F172A]">Lokasi:</strong> {photo.location}</span>
              </div>
            </div>

            {/* Quote Box if present */}
            {photo.quote && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-left">
                <p className="text-xs sm:text-sm font-semibold text-[#0369A1] italic leading-relaxed">
                  &ldquo;{photo.quote}&rdquo;
                </p>
                <span className="text-[11px] font-mono text-[#0284C7] mt-1.5 block font-medium">
                  &bull; Catatan Refleksi Alfi
                </span>
              </div>
            )}

            {/* Short Story Article */}
            {photo.shortStory ? (
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                  Cerita di Balik Momen:
                </h4>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-sans">
                  {photo.shortStory}
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#475569] leading-relaxed font-sans">
                {photo.description}
              </p>
            )}

            {/* Takeaway Insight */}
            {photo.takeaway && (
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block font-semibold mb-1">
                  Pelajaran Praktis:
                </span>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  {photo.takeaway}
                </p>
              </div>
            )}

            {/* Key Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-semibold">
                Sorotan Kegiatan:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {photo.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] flex items-center gap-2 font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
