import React from 'react';
import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';

interface HeroSectionProps {
  onContactClick?: () => void;
  onAboutClick?: () => void;
  onPriceClick?: () => void;
  onProjectsClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onAboutClick,
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
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Navbar in Indonesian */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30"
      >
        <nav className="w-full flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.3rem]">
          <button
            onClick={() => {
              if (onAboutClick) onAboutClick();
              else scrollTo('about');
            }}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-medium tracking-wider"
          >
            Tentang
          </button>
          <button
            onClick={() => {
              if (onPriceClick) onPriceClick();
              else scrollTo('estimator');
            }}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-medium tracking-wider"
          >
            Estimasi
          </button>
          <button
            onClick={() => {
              if (onProjectsClick) onProjectsClick();
              else scrollTo('projects');
            }}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-medium tracking-wider"
          >
            Proyek
          </button>
          <button
            onClick={() => {
              if (onContactClick) onContactClick();
              else scrollTo('contact');
            }}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-medium tracking-wider"
          >
            Kontak
          </button>
        </nav>
      </motion.header>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden px-4 sm:px-6 md:px-10 mt-6 sm:mt-4 md:-mt-5 z-0">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center select-none text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
        >
          Halo, saya alfi
        </motion.h1>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
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
              alt="Potret Alfi - Spesialis IT"
              className="w-full h-auto object-contain max-h-[75vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none select-none"
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
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[290px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)' }}
        >
          Spesialis IT &amp; Trainer dengan fokus pada sistem enterprise dan arsitektur tangguh
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
