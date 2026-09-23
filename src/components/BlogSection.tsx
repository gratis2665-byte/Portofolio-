import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogModal } from './BlogModal';
import { FadeIn } from './FadeIn';
import { BlogCardSkeleton } from './BlogCardSkeleton';

const FILTER_TAGS = [
  { id: 'all', label: 'Semua Wawasan' },
  { id: 'PublicSpeaking', label: 'Public Speaking' },
  { id: 'PercayaDiri', label: 'Percaya Diri' },
  { id: 'TipsPresentasi', label: 'Tips Presentasi' },
  { id: 'Komunikasi', label: 'Komunikasi' },
  { id: 'IceBreaking', label: 'Ice Breaking' },
  { id: 'Fasilitator', label: 'Fasilitator Kelas' },
];

export const BlogSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filterScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const totalPosts = BLOG_POSTS.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, totalPosts - 1));
  const activePost = BLOG_POSTS[safeIndex] || BLOG_POSTS[0];

  const nextPost1 = BLOG_POSTS[(safeIndex + 1) % totalPosts];
  const nextPost2 = BLOG_POSTS[(safeIndex + 2) % totalPosts];

  const handleNext = () => {
    if (totalPosts === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalPosts);
  };

  const handlePrev = () => {
    if (totalPosts === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalPosts) % totalPosts);
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
  }, [viewMode, totalPosts]);

  const scrollFilter = (direction: 'left' | 'right') => {
    if (filterScrollRef.current) {
      const scrollAmount = 260;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));

    const matchesTag =
      selectedTag === 'all' ||
      post.tags.includes(selectedTag) ||
      post.category.toLowerCase().replace(/\s+/g, '').includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  const handleSelectTag = (tagId: string) => {
    setSelectedTag(tagId);
  };

  const resetFilters = () => {
    setSelectedTag('all');
    setSearchQuery('');
  };

  return (
    <section id="blog" className="w-full bg-white py-24 px-5 sm:px-8 md:px-10 border-t border-[#E2E8F0] select-none relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
                Wawasan Praktis
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none text-[#0F172A]"
                style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
              >
                Wawasan
              </h2>
              <p className="text-[#475569] text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Kumpulan wawasan dan tips praktis seputar cara ngomong tanpa gemetar, trik mencairkan suasana yang kaku, dan cara bikin presentasi kamu enak didengar.
              </p>
            </div>

            {/* View Mode Switcher: Geser Santai vs Semua Artikel (Seperti Modul Pelatihan) */}
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
                  Semua Artikel ({totalPosts})
                </button>
              </div>

              {/* Navigation Arrows for Slider Mode */}
              {viewMode === 'slider' && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] shadow-xs cursor-pointer transition-colors active:scale-95"
                    aria-label="Artikel sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] shadow-xs cursor-pointer transition-colors active:scale-95"
                    aria-label="Artikel berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* 1. GESER SANTAI (STACKED ARTICLE DECK WITH SWIPE) */}
        {viewMode === 'slider' && (
          <div className="space-y-6">
            {/* Quick Horizontal Jump Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {BLOG_POSTS.map((post, idx) => (
                <button
                  key={post.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    safeIndex === idx
                      ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                      : 'bg-white text-[#64748B] hover:text-[#0284C7] border border-[#E2E8F0]'
                  }`}
                >
                  <span>#{idx + 1}</span>
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">{post.title}</span>
                </button>
              ))}
            </div>

            {/* Stacked Interactive Card Container */}
            <div className="relative pt-4 pb-4">
              {/* Third Card in Stack (Lowest Layer) */}
              {nextPost2 && (
                <div
                  className="absolute inset-x-4 sm:inset-x-8 top-10 bottom-0 rounded-[36px] bg-slate-100 border border-[#CBD5E1] shadow-xs pointer-events-none transition-transform"
                  style={{
                    transform: 'translateY(16px) scale(0.94)',
                    zIndex: 1,
                    opacity: 0.5,
                  }}
                />
              )}

              {/* Second Card in Stack (Middle Layer) */}
              {nextPost1 && (
                <div
                  onClick={handleNext}
                  className="absolute inset-x-2 sm:inset-x-4 top-6 bottom-0 rounded-[36px] bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm cursor-pointer transition-transform hover:translate-y-1"
                  style={{
                    transform: 'translateY(8px) scale(0.97)',
                    zIndex: 2,
                    opacity: 0.8,
                  }}
                  title="Klik untuk ke artikel berikutnya"
                />
              )}

              {/* Top Interactive Card (Active Article with Swipe) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePost.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                      handleNext();
                    } else if (info.offset.x > 60) {
                      handlePrev();
                    }
                  }}
                  className="relative z-10 rounded-[32px] sm:rounded-[40px] border-2 border-[#BAE6FD] bg-white p-6 sm:p-8 md:p-10 shadow-lg shadow-sky-100/40 select-none cursor-grab active:cursor-grabbing overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category, Date, Read Time, and Card Counter */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-[#0284C7] text-white text-xs font-mono font-semibold uppercase tracking-wider">
                          {activePost.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>{activePost.publishedDate}</span>
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>{activePost.readTime}</span>
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-semibold">
                        Artikel {safeIndex + 1} dari {totalPosts}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActiveBlogModal(activePost)}
                      className="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#0F172A] hover:text-[#0284C7] transition-colors leading-snug tracking-tight mb-4 cursor-pointer"
                    >
                      {activePost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                      {activePost.excerpt}
                    </p>

                    {/* Feature Highlight / Snippet */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] font-semibold block mb-2">
                        Poin Inti Wawasan:
                      </span>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed line-clamp-3">
                        {activePost.content.replace(/###/g, '').replace(/---/g, '').slice(0, 260)}...
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activePost.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-mono text-[#0284C7]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions and Navigation Indicators */}
                  <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      {BLOG_POSTS.slice(0, Math.min(12, totalPosts)).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentIndex(dotIdx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            safeIndex === dotIdx
                              ? 'w-6 bg-[#0284C7]'
                              : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                          }`}
                          aria-label={`Ke artikel ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveBlogModal(activePost)}
                        className="px-6 py-2.5 rounded-full bg-[#0284C7] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0369A1] transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Baca Artikel Lengkap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-4 py-2.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] text-xs font-semibold uppercase tracking-wider hover:text-[#0284C7] hover:border-[#0284C7] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* 2. SEMUA ARTIKEL / GRID MODE (WITH SLIDEABLE FILTER BAR & SEARCH) */}
        {viewMode === 'grid' && (
          <div>
            {/* Search Bar in Grid Mode */}
            <div className="mb-6 flex justify-end">
              <div className="w-full md:w-80">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari tips atau topik..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 text-xs rounded-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                      aria-label="Hapus kata kunci"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Slideable Filter Bar (No Wrap, Slide Left/Right via Buttons or Touch Swipe) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold flex items-center gap-1.5">
                  <span>Filter Topik</span>
                  <span className="text-[11px] text-[#94A3B8] font-normal hidden sm:inline">(Geser / Slide untuk memilih)</span>
                </span>

                {/* Left and Right Slide Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollFilter('left')}
                    className="p-1.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] hover:text-[#0284C7] hover:border-[#0284C7] shadow-xs cursor-pointer transition-colors"
                    aria-label="Geser ke kiri"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollFilter('right')}
                    className="p-1.5 rounded-full bg-white border border-[#CBD5E1] text-[#475569] hover:text-[#0284C7] hover:border-[#0284C7] shadow-xs cursor-pointer transition-colors"
                    aria-label="Geser ke kanan"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Track */}
              <div className="relative w-full rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-1.5">
                <div
                  ref={filterScrollRef}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap py-1 px-1 select-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {FILTER_TAGS.map((tag) => {
                    const count = tag.id === 'all'
                      ? BLOG_POSTS.length
                      : BLOG_POSTS.filter((p) =>
                          p.tags.includes(tag.id) ||
                          p.category.toLowerCase().replace(/\s+/g, '').includes(tag.id.toLowerCase())
                        ).length;

                    const isSelected = selectedTag === tag.id;

                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleSelectTag(tag.id)}
                        className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs font-mono rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#0284C7] text-white font-semibold shadow-xs'
                            : 'bg-white text-[#475569] hover:bg-[#F0F9FF] hover:text-[#0284C7] border border-[#CBD5E1]'
                        }`}
                      >
                        <span>{tag.label}</span>
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

            {/* Active Filter Status & Reset Badge */}
            {(selectedTag !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs mb-6 text-[#0369A1]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>
                    Menampilkan <strong>{filteredPosts.length}</strong> artikel
                    {selectedTag !== 'all' && (
                      <span> untuk topik <strong>#{selectedTag}</strong></span>
                    )}
                    {searchQuery && (
                      <span> dengan pencarian &quot;<strong>{searchQuery}</strong>&quot;</span>
                    )}
                  </span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Tampilkan Semua</span>
                </button>
              </div>
            )}

            {/* Blog Posts Grid / Skeleton State */}
            {isLoading ? (
              <BlogCardSkeleton count={4} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setActiveBlogModal(post)}
                      className="group flex flex-col justify-between p-6 sm:p-7 rounded-[28px] bg-white border border-[#E2E8F0] hover:border-[#0284C7] shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div>
                        {/* Meta header: Clean typography */}
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#64748B] mb-3">
                          <span className="font-semibold text-[#0284C7] uppercase tracking-wider text-xs">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span>{post.publishedDate}</span>
                            <span>&bull;</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold uppercase text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-snug mb-3">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer and Read CTA */}
                      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((t) => {
                            const isCurrentTag = selectedTag === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectTag(t);
                                }}
                                className={`text-xs font-mono px-2.5 py-0.5 rounded-md border transition-colors cursor-pointer ${
                                  isCurrentTag
                                    ? 'bg-[#0284C7] text-white border-[#0284C7]'
                                    : 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD] hover:bg-[#E0F2FE]'
                                }`}
                                title={`Filter artikel #${t}`}
                              >
                                #{t}
                              </button>
                            );
                          })}
                        </div>

                        <span className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] group-hover:text-[#0369A1] inline-flex items-center gap-1.5 transition-colors shrink-0">
                          <span>Baca</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="p-12 text-center rounded-[28px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">
                <p className="text-sm font-medium text-[#0F172A] mb-1">
                  Tidak ada artikel yang cocok dengan filter atau kata kunci saat ini.
                </p>
                <p className="text-xs text-[#64748B] mb-4">
                  Coba pilih topik lain atau hapus kata pencarian.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-full bg-[#0284C7] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0369A1] transition-colors cursor-pointer"
                >
                  Lihat Semua Wawasan
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <BlogModal
        post={activeBlogModal}
        onClose={() => setActiveBlogModal(null)}
      />
    </section>
  );
};
