import React from 'react';
import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';

interface HeroSectionProps {
  onContactClick?: () => void;
  onAboutClick?: () => void;
  onGalleryClick?: () => void;
  onPriceClick?: () => void;
  onProjectsClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onAboutClick,
  onGalleryClick,
  onPriceClick,
  onProjectsClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-x-clip bg-white select-none border-b border-[#E2E8F0]"
    >
      {/* 1. Navbar in Indonesian */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30"
      >
        <nav className="w-full flex items-center justify-between text-[#0F172A] font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.3rem]">
          <button
            onClick={() => {
              if (onAboutClick) onAboutClick();
              else scrollTo('about');
            }}
            className="hover:text-[#0284C7] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Tentang
          </button>
          <button
            onClick={() => {
              if (onGalleryClick) onGalleryClick();
              else if (onPriceClick) onPriceClick();
              else scrollTo('galeri');
            }}
            className="hover:text-[#0284C7] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Galeri
          </button>
          <button
            onClick={() => {
              if (onProjectsClick) onProjectsClick();
              else scrollTo('projects');
            }}
            className="hover:text-[#0284C7] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Materi
          </button>
          <button
            onClick={() => {
              if (onContactClick) onContactClick();
              else scrollTo('contact');
            }}
            className="hover:text-[#0284C7] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Kontak
          </button>
        </nav>
      </motion.header>

      {/* 2. Hero Heading */}
      <div className="w-full px-4 sm:px-6 md:px-10 mt-3 sm:mt-4 md:mt-2 z-0 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-extrabold uppercase tracking-tight leading-none text-center select-none"
          style={{ fontSize: 'clamp(1.85rem, 5.5vw, 4.25rem)' }}
        >
          Halo, Saya Alfi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs sm:text-sm text-[#0284C7] uppercase tracking-widest mt-1.5 text-center font-semibold"
        >
          Trainer &amp; Fasilitator Pelatihan
        </motion.p>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[440px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-end"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Potret Alfi"
              className="w-full h-auto object-contain max-h-[75vh] pointer-events-none select-none"
              draggable={false}
            />
          </Magnet>
        </motion.div>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#334155] font-normal uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[280px] md:max-w-[340px]"
          style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 1.1rem)' }}
        >
          Bantu kamu dan tim lebih berani ngomong di depan umum, percaya diri, dan bikin presentasi jadi seru tanpa rasa canggung
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton
            label="Hubungi Saya"
            onClick={() => {
              if (onContactClick) onContactClick();
              else scrollTo('contact');
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
