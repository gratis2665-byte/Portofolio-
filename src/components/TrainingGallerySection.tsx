import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/portfolioData';
import { GalleryPhoto } from '../types';
import { GalleryModal } from './GalleryModal';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const TrainingGallerySection: React.FC = () => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryPhoto | null>(null);

  const galleryCategories = [
    { id: 'all', label: 'Semua Dokumentasi' },
    { id: 'corporate', label: 'Pelatihan Instansi' },
    { id: 'bootcamp', label: 'Workshop Komunitas' },
    { id: 'conference', label: 'Seminar & Keynote' },
    { id: 'university', label: 'Kampus & Sekolah' },
  ];

  const getCategoryLabel = (catId: string) => {
    const found = galleryCategories.find((c) => c.id === catId);
    return found ? found.label : catId;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const filteredPhotos = selectedGalleryCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedGalleryCategory);

  return (
    <section id="galeri" className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header with smooth scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
              Dokumentasi Sesi &bull; Suasana Kelas
            </span>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
            >
              Galeri
            </h2>
            <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
              Dokumentasi suasana workshop interaktif, simulasi public speaking, dinamika kelompok, dan sesi pelatihan bersama peserta.
            </p>
          </div>

          {/* Gallery Category Filter Pills */}
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
        </motion.div>

        {/* Gallery Grid with Scroll Trigger & Staggered Reveal */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                onClick={() => setActivePhotoModal(photo)}
                className="group relative rounded-[28px] overflow-hidden bg-[#141414] border border-[#262626] hover:border-[#B600A8]/50 aspect-[4/3] cursor-pointer shadow-md hover:shadow-[0_20px_40px_-15px_rgba(182,0,168,0.28),0_0_0_1px_rgba(182,0,168,0.2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {/* Image with Hardware-Accelerated Smooth Scale */}
                <ImageWithSkeleton
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 will-change-transform"
                />

                {/* Layer 1: Contrast Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none transition-opacity duration-500" />

                {/* Layer 2: Subtle Ambient Magenta Hover Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B600A8]/15 via-transparent to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Left: Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full bg-black/60 text-[#D7E2EA]/85 backdrop-blur-md border border-white/10 shadow-sm">
                    {getCategoryLabel(photo.category)}
                  </span>
                </div>

                {/* Top Right: Lightbox Expand Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#D7E2EA] group-hover:text-white group-hover:border-[#B600A8]/60 group-hover:bg-black/80 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-4 left-4 right-4 text-[#D7E2EA] z-10 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                  {/* Highlight Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#D7E2EA] group-hover:border-[#B600A8]/60 group-hover:text-white transition-all duration-300 mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] group-hover:bg-[#E03BCE] transition-colors" />
                    <span className="truncate max-w-[210px] sm:max-w-[240px]">
                      {photo.highlights?.[0] || getCategoryLabel(photo.category)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight line-clamp-2 drop-shadow-md group-hover:text-white transition-colors duration-300">
                    {photo.title}
                  </h3>

                  {/* Client & Date */}
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#D7E2EA]/60 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="truncate">{photo.client}</span>
                    <span>&bull;</span>
                    <span className="shrink-0">{photo.date}</span>
                  </div>
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
