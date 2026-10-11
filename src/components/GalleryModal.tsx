import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Building,
} from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GalleryModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  photo,
  onClose,
}) => {
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl sm:rounded-4xl bg-white dark:bg-[#0F172A] border border-[#CBD5E1] dark:border-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0F172A]/60 hover:bg-[#0F172A] text-white transition-colors cursor-pointer"
            aria-label="Tutup foto dokumentasi"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Image Container */}
          <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden">
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-[#0284C7] animate-spin" />
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
                  setImgSrc(
                    'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=1200&q=80'
                  );
                }
                setImgLoading(false);
              }}
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* Content & Details */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] font-bold block mb-1">
                  {photo.category.toUpperCase()} &bull; {photo.client}
                </span>
                <h3 className="hero-heading text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0F172A] dark:text-white">
                  {photo.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  <span>{photo.participantCount} Peserta</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Building className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Klien:</strong> {photo.client}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                <span>
                  <strong className="text-slate-900 dark:text-white">Lokasi:</strong> {photo.location}
                </span>
              </div>
            </div>

            {/* Atmosphere Quote */}
            {photo.quote && (
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-200 dark:border-slate-700">
                <p className="text-xs sm:text-sm font-semibold text-sky-900 dark:text-sky-200 italic leading-relaxed">
                  &ldquo;{photo.quote}&rdquo;
                </p>
              </div>
            )}

            {/* Story / Description */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {photo.shortStory || photo.description}
            </p>

            {/* Highlights */}
            {photo.highlights && photo.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-bold">
                  Sorotan Momen:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {photo.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#38BDF8] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
