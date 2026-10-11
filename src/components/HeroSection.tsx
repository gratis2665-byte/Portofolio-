import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-x-hidden bg-white dark:bg-[#0B1120] select-none border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      {/* 1. Navbar in Indonesian */}
      <header className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30">
        <nav className="w-full flex items-center justify-between text-[#0F172A] dark:text-[#F8FAFC] font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.3rem]">
          <button
            onClick={() => {
              if (onAboutClick) onAboutClick();
              else scrollTo('about');
            }}
            className="hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Tentang
          </button>
          <button
            onClick={() => {
              if (onGalleryClick) onGalleryClick();
              else if (onPriceClick) onPriceClick();
              else scrollTo('galeri');
            }}
            className="hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Galeri
          </button>
          <button
            onClick={() => {
              if (onProjectsClick) onProjectsClick();
              else scrollTo('projects');
            }}
            className="hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Materi
          </button>
          <button
            onClick={() => {
              if (onContactClick) onContactClick();
              else scrollTo('contact');
            }}
            className="hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit uppercase font-semibold tracking-wider"
          >
            Kontak
          </button>

          {/* Tombol Dark Mode */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            className="flex items-center justify-center p-1.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7]" />
            )}
          </button>
        </nav>
      </header>

      {/* 2. Hero Heading & Quick Actions */}
      <div className="w-full px-4 sm:px-6 md:px-10 mt-2 sm:mt-3 md:mt-1 z-20 flex flex-col items-center justify-center pointer-events-auto">
        <h1
          className="hero-heading font-extrabold uppercase tracking-tight leading-none text-center select-none"
          style={{ fontSize: 'clamp(1.85rem, 5.5vw, 4.25rem)' }}
        >
          Halo, Saya Alfi
        </h1>
        <p className="text-xs sm:text-sm text-[#0284C7] uppercase tracking-widest mt-1.5 text-center font-semibold">
          Trainer &amp; Fasilitator Pelatihan
        </p>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[440px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <div>
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
        </div>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 gap-4 sm:gap-0">
        <p
          className="text-[#334155] dark:text-[#94A3B8] font-normal uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[280px] md:max-w-[340px]"
          style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 1.1rem)' }}
        >
          Bantu kamu dan tim lebih berani ngomong di depan umum, percaya diri, dan bikin presentasi jadi seru tanpa rasa canggung
        </p>

        <div className="w-full sm:w-auto">
          <ContactButton
            label="Hubungi Saya"
            onClick={() => {
              if (onContactClick) onContactClick();
              else scrollTo('contact');
            }}
          />
        </div>
      </div>
    </section>
  );
};
