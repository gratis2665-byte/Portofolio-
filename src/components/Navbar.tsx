import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Menu,
  X,
  MessageSquare,
  Search,
  ArrowUpRight,
  FileSpreadsheet,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandMenu: () => void;
  onOpenGoogleSheets: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandMenu, onOpenGoogleSheets }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, activeSpreadsheet } = useGoogleSheets();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Tentang Saya', href: '#about' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Statistik', href: '#statistik' },
    { name: 'Estimasi', href: '#estimator' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'Wawasan', href: '#blog' },
    { name: 'Kontak', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppQuickChat = () => {
    const message = encodeURIComponent(
      'Halo Mas Alfi, saya melihat portofolio Anda dan ingin berdiskusi mengenai pelatihan teknis / kebutuhan IT.'
    );
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-50/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
            id="nav-brand-logo"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-serif text-xl font-bold transition-transform group-hover:scale-105 shadow-xs">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-stone-900 dark:text-stone-100 text-base tracking-tight leading-none group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Alfi
              </span>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 tracking-wider">
                IT &amp; Tech Trainer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-200/50 dark:bg-stone-900/60 p-1.5 rounded-full border border-stone-300/50 dark:border-stone-800 backdrop-blur-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-stone-900 dark:text-stone-100 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-white dark:bg-stone-800 rounded-full shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Google Sheets Hub Button */}
            <button
              onClick={onOpenGoogleSheets}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer shadow-2xs ${
                isAuthenticated
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-500'
              }`}
              title="Kelola & Sinkronisasi Google Sheets"
              id="nav-google-sheets-btn"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">
                {isAuthenticated ? (activeSpreadsheet ? activeSpreadsheet.title.slice(0, 14) + '...' : 'Google Sheets') : 'Google Sheets'}
              </span>
              {isAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              )}
            </button>

            {/* Quick Search / Command Menu Trigger */}
            <button
              onClick={onOpenCommandMenu}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg hover:border-stone-400 dark:hover:border-stone-700 transition-colors cursor-pointer"
              title="Cari Proyek, Silabus & Artikel (Ctrl + K)"
              id="nav-search-trigger"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cari...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              id="theme-toggle-button"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppQuickChat}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-all shadow-xs cursor-pointer"
              id="nav-whatsapp-cta"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Alfi</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Buka navigasi menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-stone-50/98 dark:bg-[#121212]/98 border-b border-stone-200 dark:border-stone-800 px-6 py-6 shadow-xl lg:hidden backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGoogleSheets();
                }}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Google Sheets Integration Hub</span>
                </div>
                {isAuthenticated && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandMenu();
                }}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-600 dark:text-stone-300"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-stone-400" />
                  <span>Cari materi, proyek, atau artikel...</span>
                </div>
                <kbd className="text-xs font-mono px-2 py-0.5 bg-stone-200 dark:bg-stone-800 rounded">⌘K</kbd>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-2.5 text-sm font-medium rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-stone-800 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppQuickChat}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hubungi via WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
