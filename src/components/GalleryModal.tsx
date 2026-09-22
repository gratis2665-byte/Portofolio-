import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, Building, CheckCircle2 } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface GalleryModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-[#141414] border border-[#2A2A2A] text-[#D7E2EA] shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors z-20 cursor-pointer"
            aria-label="Tutup foto"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Image */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-[#0C0C0C]">
            <ImageWithSkeleton
              src={photo.imageUrl}
              fallbackSrc={photo.fallbackUrl}
              alt={photo.title}
              showSpinner
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Information & Highlights */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#242424] pb-4">
              <div>
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-[#1F1F1F] text-[#B600A8] border border-[#2C2C2C]">
                  {photo.category.toUpperCase()}
                </span>
                <h3 className="hero-heading text-xl sm:text-2xl font-black uppercase tracking-tight mt-2">
                  {photo.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#D7E2EA]/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{photo.participantCount} Peserta</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#D7E2EA]/80">
                <Building className="w-4 h-4 text-[#B600A8] shrink-0" />
                <span><strong className="text-white">Klien/Mitra:</strong> {photo.client}</span>
              </div>
              <div className="flex items-center gap-2 text-[#D7E2EA]/80">
                <MapPin className="w-4 h-4 text-[#B600A8] shrink-0" />
                <span><strong className="text-white">Lokasi:</strong> {photo.location}</span>
              </div>
            </div>

            <p className="text-sm text-[#D7E2EA]/80 leading-relaxed font-sans">
              {photo.description}
            </p>

            {/* Key Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/50 mb-2">
                Sorotan Kegiatan:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {photo.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#1A1A1A] border border-[#282828] text-xs text-[#D7E2EA] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
