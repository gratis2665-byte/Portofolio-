import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  BookmarkCheck,
  Check,
  ArrowLeft,
  MessageSquare,
} from 'lucide-react';
import { BlogPost } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Baca artikel menarik dari Alfi: "${post.title}"\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

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
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#141414] border border-[#2A2A2A] text-[#D7E2EA] shadow-2xl z-10"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 bg-[#141414]/95 backdrop-blur-md px-6 py-4 border-b border-[#242424] flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 rounded-full bg-[#202020] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                title={isBookmarked ? 'Hapus dari bookmark' : 'Simpan ke bookmark'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#B600A8] fill-[#B600A8]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="p-2 rounded-full bg-[#202020] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                title="Bagikan via WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-[#202020] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                title="Salin tautan"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#202020] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Container */}
          <div className="p-6 sm:p-10 max-w-2xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#D7E2EA]/50 mb-4">
              <span className="px-3 py-0.5 rounded-full bg-[#1F1F1F] text-[#B600A8] border border-[#2B2B2B]">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pb-6 border-b border-[#242424] mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#BE4C00] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {PERSONAL_INFO.fullName}
                </div>
                <div className="text-[11px] text-[#D7E2EA]/50 font-mono">
                  {PERSONAL_INFO.title}
                </div>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="space-y-5 text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed font-sans">
              <div className="whitespace-pre-line leading-relaxed space-y-4">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-[#242424]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/50 block mb-2">
                Topik Terkait:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-[#1A1A1A] text-[#D7E2EA]/70 border border-[#282828]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
