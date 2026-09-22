import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Server,
  Layers,
  Sparkles,
  Cpu,
  Clock,
  Users,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar,
} from 'lucide-react';
import { GALLERY_PHOTOS, PERSONAL_INFO } from '../data/portfolioData';
import { GalleryPhoto } from '../types';
import { GalleryModal } from './GalleryModal';
import { FadeIn } from './FadeIn';

export const TrainingGallerySection: React.FC = () => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryPhoto | null>(null);

  const galleryCategories = [
    { id: 'all', label: 'Semua Dokumentasi' },
    { id: 'corporate', label: 'In-House Korporasi' },
    { id: 'bootcamp', label: 'Bootcamp Intensif' },
    { id: 'conference', label: 'Konferensi & Keynote' },
    { id: 'university', label: 'Kuliah Tamu' },
  ];

  const filteredPhotos = selectedGalleryCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedGalleryCategory);

  return (
    <section id="galeri" className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
                Live Workshop &bull; Corporate Sessions
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 90px)' }}
              >
                Gallery
              </h2>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Dokumentasi suasana workshop interaktif, in-house corporate bootcamps, dan sesi keynote di berbagai kota di Indonesia.
              </p>
            </div>

            {/* Gallery Filters */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#181818] border border-[#282828] self-start md:self-auto">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedGalleryCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    selectedGalleryCategory === cat.id
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                      : 'text-[#D7E2EA]/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActivePhotoModal(photo)}
                className="group relative rounded-[28px] overflow-hidden bg-[#161616] border border-[#282828] hover:border-[#3E3E3E] aspect-[4/3] cursor-pointer shadow-lg transition-all"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                    {photo.category}
                  </span>
                </div>

                {/* Bottom Text */}
                <div className="absolute bottom-4 left-4 right-4 text-[#D7E2EA]">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#D7E2EA]/60 mb-1">
                    <span>{photo.client}</span> &bull; <span>{photo.date}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-white transition-colors">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        photo={activePhotoModal}
        onClose={() => setActivePhotoModal(null)}
      />
    </section>
  );
};
