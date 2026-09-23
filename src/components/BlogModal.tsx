import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop - Solid Dark */}
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
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white border border-[#BAE6FD] text-[#0F172A] shadow-2xl z-10 my-6"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 border-b border-[#E2E8F0] backdrop-blur-sm">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0284C7] hover:text-[#0369A1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Wawasan</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F0F9FF] text-[#0F172A] hover:bg-[#E0F2FE] border border-[#BAE6FD] transition-colors cursor-pointer"
              aria-label="Tutup artikel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Article Container */}
          <div className="p-6 sm:p-10 max-w-2xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748B] mb-4">
              <span className="font-semibold text-[#0284C7] uppercase tracking-wider text-xs">
                {post.category}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                {post.publishedDate}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight mb-6 tracking-tight text-[#0F172A]">
              {post.title}
            </h1>

            {/* Author Byline - Clean transparent avatar */}
            <div className="flex items-center gap-3 pb-6 border-b border-[#E2E8F0] mb-8">
              <div className="w-10 h-10 rounded-full border-2 border-[#0284C7] bg-transparent flex items-center justify-center text-[#0284C7] font-bold text-sm">
                A
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  {PERSONAL_INFO.fullName}
                </div>
                <div className="text-[11px] text-[#64748B] font-mono">
                  {PERSONAL_INFO.title}
                </div>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="space-y-5 text-sm sm:text-base text-[#334155] leading-relaxed font-sans">
              <div className="whitespace-pre-line leading-relaxed space-y-4">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-2 font-semibold">
                Topik Terkait:
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-[#BAE6FD]"
                  >
                    #{tag}
                  </span>
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
