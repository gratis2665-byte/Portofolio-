import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const TestimonialsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Testimoni' },
    { id: 'corporate', label: 'Klien BUMN & Korporasi' },
    { id: 'bootcamp', label: 'Alumni Bootcamp' },
    { id: 'mentorship', label: 'Mentee & Akademisi' },
  ];

  const filteredTestimonials = selectedCategory === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === selectedCategory);

  return (
    <section id="testimoni" className="w-full bg-[#0C0C0C] py-24 px-5 sm:px-8 md:px-10 border-t border-[#1C1C1C] select-none relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block mb-2">
                Client Reviews &bull; Endorsements
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 90px)' }}
              >
                Testimonials
              </h2>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Ulasan terverifikasi dari para Tech Leader, VP of Engineering, dan tim developer yang telah mengikuti program pelatihan Alfi.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#181818] border border-[#282828] self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat.id
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

        {/* Testimonials Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-[28px] bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Topic badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-[#1F1F1F] text-[#D7E2EA]/60 border border-[#2A2A2A] line-clamp-1">
                      {testimonial.trainingTopic}
                    </span>
                  </div>

                  {/* Content Quote */}
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/85 leading-relaxed italic mb-6 font-sans">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#222222] flex items-center gap-3.5">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#333333] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <span title="Testimoni Terverifikasi">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#D7E2EA]/50 truncate">
                      {testimonial.title}
                    </p>
                    <p className="text-[11px] font-semibold text-[#B600A8] truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
