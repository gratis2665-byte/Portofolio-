import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Sparkles,
  RotateCw,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogModal } from './BlogModal';
import { FadeIn } from './FadeIn';
import { BlogCardSkeleton } from './BlogCardSkeleton';

export const BlogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Perceived performance initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Extract unique tags
  const allTags = ['all', ...Array.from(new Set(BLOG_POSTS.flatMap((post) => post.tags)))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
                Catatan Pelatihan &bull; Tips Praktis
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
              >
                Wawasan
              </h2>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Tulisan praktis mengenai cara mengatasi demam panggung, teknik ice-breaking interaktif yang tidak kaku, dan panduan membawakan workshop ramah pemula.
              </p>
            </div>

            {/* Search Bar & Refresh */}
            <div className="w-full md:w-80 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#D7E2EA]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari artikel atau topik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-xs rounded-full bg-[#181818] border border-[#2B2B2B] text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                />
              </div>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2.5 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2B2B2B] hover:border-[#B600A8] text-[#D7E2EA]/70 hover:text-white transition-all cursor-pointer shadow-sm disabled:opacity-50"
                title="Muat ulang artikel (Simulasi Skeleton)"
                aria-label="Muat ulang artikel"
              >
                <RotateCw className={`w-4 h-4 text-[#B600A8] ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-[#D7E2EA]/50 mr-1">Filter Tag:</span>
          {allTags.slice(0, 7).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-medium shadow-sm'
                  : 'bg-[#181818] text-[#D7E2EA]/60 hover:bg-[#242424] hover:text-white border border-[#2B2B2B]'
              }`}
            >
              {tag === 'all' ? 'Semua' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid / Skeleton State */}
        {isLoading ? (
          <BlogCardSkeleton count={4} />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveBlogModal(post)}
                  className="group flex flex-col justify-between p-6 sm:p-7 rounded-[28px] bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all cursor-pointer shadow-lg"
                >
                  <div>
                    {/* Meta header */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#D7E2EA]/50 mb-3">
                      <span className="px-3 py-0.5 rounded-full bg-[#1F1F1F] text-[#B600A8] border border-[#2A2A2A] font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{post.publishedDate}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase text-[#D7E2EA] group-hover:text-white transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed mb-6 font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer and Read CTA */}
                  <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-[#D7E2EA]/40"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-medium uppercase tracking-wider text-[#B600A8] group-hover:text-white inline-flex items-center gap-1.5 transition-colors">
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center rounded-[28px] bg-[#141414] border border-[#262626] text-[#D7E2EA]/50">
            <p className="text-sm">Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('all');
              }}
              className="mt-3 text-xs text-[#B600A8] font-medium underline cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
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
