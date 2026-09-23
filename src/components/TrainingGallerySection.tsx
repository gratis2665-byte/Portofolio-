import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Building,
  Quote,
  BookOpen,
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/portfolioData';
import { GalleryPhoto } from '../types';
import { GalleryModal } from './GalleryModal';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const TrainingGallerySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryPhoto | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const galleryCategories = [
    { id: 'all', label: 'Semua Momen' },
    { id: 'corporate', label: 'Pelatihan Kantor' },
    { id: 'bootcamp', label: 'Kelas Komunitas' },
    { id: 'university', label: 'Kampus & Mahasiswa' },
    { id: 'conference', label: 'Seminar & Panggung' },
  ];

  const totalPhotos = GALLERY_PHOTOS.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, totalPhotos - 1));
  const activePhoto = GALLERY_PHOTOS[safeIndex] || GALLERY_PHOTOS[0];

  const nextPhoto1 = GALLERY_PHOTOS[(safeIndex + 1) % totalPhotos];
  const nextPhoto2 = GALLERY_PHOTOS[(safeIndex + 2) % totalPhotos];

  const handleNext = () => {
    if (totalPhotos === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrev = () => {
    if (totalPhotos === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slider') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, totalPhotos]);

  const scrollCategoryFilter = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      const scrollAmount = 240;
      galleryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.06,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const filteredPhotos = selectedGalleryCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedGalleryCategory);

  return (
    <section id="galeri" className="w-full bg-white py-24 px-5 sm:px-8 md:px-10 border-t border-[#E2E8F0] select-none relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
              Momen &bull; Suasana Kelas
            </span>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none text-[#0F172A]"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
            >
              Galeri Foto
            </h2>
            <p className="text-[#475569] text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
              Kumpulan dokumentasi kegiatan pelatihan, cerita refleksi di balik momen, dan potret kehangatan bersama para peserta.
            </p>
          </div>

          {/* View Mode Switcher: Geser Santai vs Lihat Semua (Seperti Modul Pelatihan) */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <div className="flex items-center p-1 rounded-full bg-white border border-[#BAE6FD] shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Geser Santai
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Lihat Semua ({totalPhotos})
              </button>
            </div>

            {/* Navigation Arrows for Slider Mode */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] shadow-xs cursor-pointer transition-colors active:scale-95"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] shadow-xs cursor-pointer transition-colors active:scale-95"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. GESER SANTAI (STACKED PHOTO DECK WITH ARTICLE & STORY) */}
        {viewMode === 'slider' && (
          <div className="space-y-6">
            {/* Quick Horizontal Jump Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {GALLERY_PHOTOS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    safeIndex === idx
                      ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                      : 'bg-white text-[#64748B] hover:text-[#0284C7] border border-[#E2E8F0]'
                  }`}
                >
                  <span>#{idx + 1}</span>
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Active Card with Stacked Photo Deck */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-[32px] sm:rounded-[40px] border border-[#BAE6FD] bg-white p-5 sm:p-8 md:p-10 shadow-lg shadow-sky-100/40 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Stacked Photos Effect ("Poto Ditumpuk") */}
                  <div className="lg:col-span-6 relative flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] max-w-[500px]">
                      {/* Third Card in Stack (Lowest Layer) */}
                      {nextPhoto2 && (
                        <div
                          className="absolute inset-0 rounded-[28px] overflow-hidden border border-[#CBD5E1] bg-slate-200 shadow-xs pointer-events-none transition-transform"
                          style={{
                            transform: 'translateY(16px) scale(0.92)',
                            zIndex: 1,
                            opacity: 0.5,
                          }}
                        >
                          <img
                            src={nextPhoto2.imageUrl}
                            alt=""
                            className="w-full h-full object-cover filter blur-[0.5px]"
                          />
                        </div>
                      )}

                      {/* Second Card in Stack (Middle Layer) */}
                      {nextPhoto1 && (
                        <div
                          onClick={handleNext}
                          className="absolute inset-0 rounded-[28px] overflow-hidden border border-[#CBD5E1] bg-slate-100 shadow-sm cursor-pointer transition-transform hover:translate-y-2"
                          style={{
                            transform: 'translateY(8px) scale(0.96)',
                            zIndex: 2,
                            opacity: 0.75,
                          }}
                          title="Klik untuk ke foto berikutnya"
                        >
                          <img
                            src={nextPhoto1.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-[#0F172A]/20" />
                        </div>
                      )}

                      {/* Top Interactive Card (Active Photo with Swipe Gesture) */}
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -50) {
                            handleNext();
                          } else if (info.offset.x > 50) {
                            handlePrev();
                          }
                        }}
                        onClick={() => setActivePhotoModal(activePhoto)}
                        className="absolute inset-0 rounded-[28px] overflow-hidden border-2 border-[#0284C7] bg-slate-900 shadow-md cursor-grab active:cursor-grabbing group z-10"
                        title="Geser atau klik untuk memperbesar foto"
                      >
                        <ImageWithSkeleton
                          src={activePhoto.imageUrl}
                          fallbackSrc={activePhoto.fallbackUrl}
                          alt={activePhoto.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#0F172A]/80 text-white text-[11px] font-mono backdrop-blur-xs">
                            {safeIndex + 1} / {totalPhotos}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#0284C7] text-white text-[11px] font-mono uppercase font-semibold">
                            {activePhoto.category}
                          </span>
                        </div>

                        {/* Lightbox Icon */}
                        <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0F172A]/70 text-white flex items-center justify-center group-hover:bg-[#0284C7] transition-colors shadow-sm">
                          <Maximize2 className="w-4 h-4" />
                        </div>

                        {/* Drag Hint on Bottom */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-[#0F172A]/85 text-center text-[11px] font-mono text-white/90 z-20 flex items-center justify-between px-4">
                          <span>Geser atau klik foto untuk melihat penuh</span>
                          <span className="text-sky-300 font-bold">{activePhoto.date}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Pagination Indicators & Next/Prev Controls */}
                    <div className="flex items-center justify-between w-full max-w-[500px] mt-8 pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5">
                        {GALLERY_PHOTOS.slice(0, Math.min(12, totalPhotos)).map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentIndex(dotIdx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              safeIndex === dotIdx
                                ? 'w-6 bg-[#0284C7]'
                                : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                            }`}
                            aria-label={`Ke foto ${dotIdx + 1}`}
                          />
                        ))}
                      </div>

                      <div className="text-xs font-mono text-[#64748B]">
                        Foto <strong className="text-[#0284C7]">{safeIndex + 1}</strong> dari {totalPhotos}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Short Article, Kata-Kata, and Insights */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                    {/* Meta info header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-semibold">
                          {activePhoto.client}
                        </span>
                        <span className="text-[#94A3B8]">&bull;</span>
                        <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>{activePhoto.location}</span>
                        </span>
                        <span className="text-[#94A3B8]">&bull;</span>
                        <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>{activePhoto.participantCount} Peserta</span>
                        </span>
                      </div>

                      <h3 className="hero-heading text-xl sm:text-2xl font-black uppercase text-[#0F172A] leading-snug tracking-tight">
                        {activePhoto.title}
                      </h3>
                    </div>

                    {/* Kata-kata Mutiara / Quote Refleksi */}
                    {activePhoto.quote && (
                      <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] relative">
                        <Quote className="w-5 h-5 text-[#0284C7] mb-1.5 opacity-80" />
                        <p className="text-xs sm:text-sm font-semibold text-[#0369A1] italic leading-relaxed">
                          &ldquo;{activePhoto.quote}&rdquo;
                        </p>
                        <span className="text-[11px] font-mono text-[#0284C7] mt-1.5 block font-medium">
                          &bull; Refleksi Kelas Alfi
                        </span>
                      </div>
                    )}

                    {/* Artikel Pendek Momen Ini */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Cerita di Balik Momen:</span>
                      </span>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-sans">
                        {activePhoto.shortStory || activePhoto.description}
                      </p>
                    </div>

                    {/* Pelajaran Praktis */}
                    {activePhoto.takeaway && (
                      <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] block font-semibold mb-1">
                          Pelajaran Praktis:
                        </span>
                        <p className="text-xs text-[#0F172A] leading-relaxed">
                          {activePhoto.takeaway}
                        </p>
                      </div>
                    )}

                    {/* Action button */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActivePhotoModal(activePhoto)}
                        className="px-5 py-2.5 rounded-full bg-[#0284C7] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0369A1] transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Buka Foto & Detail Penuh</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-4 py-2.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] text-xs font-semibold uppercase tracking-wider hover:text-[#0284C7] hover:border-[#0284C7] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Geser Foto Selanjutnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 2. LIHAT SEMUA / GRID MODE (WITH SLIDEABLE CATEGORY FILTER & SHORT ARTIKEL SNIPPET) */}
        {viewMode === 'grid' && (
          <div>
            {/* Slideable Category Filter Bar (No Downward Wrap) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold flex items-center gap-1.5">
                  <span>Kategori Momen</span>
                  <span className="text-[11px] text-[#94A3B8] font-normal hidden sm:inline">(Geser / Slide untuk memilih)</span>
                </span>

                {/* Left and Right Slide Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollCategoryFilter('left')}
                    className="p-1.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] hover:text-[#0284C7] hover:border-[#0284C7] shadow-xs cursor-pointer transition-colors"
                    aria-label="Geser galeri ke kiri"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCategoryFilter('right')}
                    className="p-1.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] hover:text-[#0284C7] hover:border-[#0284C7] shadow-xs cursor-pointer transition-colors"
                    aria-label="Geser galeri ke kanan"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Track */}
              <div className="relative w-full rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-1.5">
                <div
                  ref={galleryScrollRef}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap py-1 px-1 select-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {galleryCategories.map((cat) => {
                    const count = cat.id === 'all'
                      ? GALLERY_PHOTOS.length
                      : GALLERY_PHOTOS.filter((p) => p.category === cat.id).length;

                    const isSelected = selectedGalleryCategory === cat.id;

                    return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedGalleryCategory(cat.id)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#0284C7] text-white font-semibold shadow-xs'
                        : 'bg-white text-[#475569] hover:bg-[#F0F9FF] hover:text-[#0284C7] border border-[#CBD5E1]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        isSelected ? 'bg-[#0369A1] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.06, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    onClick={() => setActivePhotoModal(photo)}
                    className="group flex flex-col justify-between rounded-[28px] overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0284C7] cursor-pointer shadow-xs hover:shadow-md transition-all"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <ImageWithSkeleton
                        src={photo.imageUrl}
                        fallbackSrc={photo.fallbackUrl}
                        alt={photo.title}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Top Right: Lightbox Expand Icon */}
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#0F172A]/70 flex items-center justify-center text-white group-hover:bg-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>

                      {/* Category Badge on top left */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-[#0F172A]/80 text-sky-200 text-[10px] font-mono uppercase font-semibold">
                          {photo.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Short Article / Words */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-2">
                          <span className="font-semibold text-[#0284C7] truncate max-w-[160px]">{photo.client}</span>
                          <span>{photo.date}</span>
                        </div>

                        <h3 className="text-sm font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors mb-2 line-clamp-1">
                          {photo.title}
                        </h3>

                        {/* Kata-kata Mutiara Refleksi Singkat */}
                        {photo.quote ? (
                          <p className="text-xs text-[#0369A1] italic bg-[#F0F9FF] p-2.5 rounded-xl border border-[#BAE6FD] mb-3 line-clamp-2">
                            &ldquo;{photo.quote}&rdquo;
                          </p>
                        ) : null}

                        {/* Cuplikan Artikel Pendek */}
                        <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mb-3">
                          {photo.shortStory || photo.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                        <span>Baca Cerita & Buka Foto</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        photo={activePhotoModal}
        onClose={() => setActivePhotoModal(null)}
      />
    </section>
  );
};
