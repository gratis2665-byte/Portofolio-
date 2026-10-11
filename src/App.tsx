import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GoogleSheetsProvider } from './context/GoogleSheetsContext';
import { ProjectProvider } from './context/ProjectContext';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StatsSection } from './components/StatsSection';
import { TrainingGallerySection } from './components/TrainingGallerySection';
import { TrainingEstimator } from './components/TrainingEstimator';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectViewerModal } from './components/ProjectViewerModal';
import { ProjectShowcaseItem } from './data/portfolioData';
import { CheckCircle2, UploadCloud, Sun, Moon } from 'lucide-react';
import { initPhotoStorage, saveMultiplePhotos } from './utils/photoStorage';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectShowcaseItem | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    initPhotoStorage();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (e.relatedTarget === null) {
        setIsDraggingOver(false);
      }
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const count = await saveMultiplePhotos(e.dataTransfer.files);
        if (count > 0) {
          setSyncToast(`${count} foto dokumentasi berhasil disinkronkan ke portofolio!`);
          setTimeout(() => setSyncToast(null), 4500);
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] font-sans select-none"
      style={{
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Main Content */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection
          onContactClick={() => setContactModalOpen(true)}
          onAboutClick={() => scrollTo('about')}
          onGalleryClick={() => scrollTo('galeri')}
          onProjectsClick={() => scrollTo('projects')}
        />

        {/* 2. Marquee Section */}
        <MarqueeSection />

        {/* 3. About Section */}
        <AboutSection onContactClick={() => setContactModalOpen(true)} />

        {/* 4. Projects Section (Swipeable Slider & Stack with pure Trainer projects) */}
        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 5. Impact & Statistics Section */}
        <StatsSection />

        {/* 6. Interactive Training Estimator / Price Section */}
        <TrainingEstimator />

        {/* 7. Photo Gallery Section */}
        <TrainingGallerySection />

        {/* 8. Technical Insights & Blog Section */}
        <BlogSection />

        {/* 9. Footer */}
        <Footer
          onContactClick={() => setContactModalOpen(true)}
        />
      </main>

      {/* Modals & Overlays */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Floating Action Buttons when scrolled down */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            className="fixed top-4 right-4 sm:top-5 sm:right-6 z-40 p-2.5 rounded-full bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0284C7] dark:hover:text-[#38BDF8] border border-slate-200 dark:border-slate-700 shadow-md cursor-pointer transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#0284C7]" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <ProjectViewerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={() => setContactModalOpen(true)}
      />

      {/* Drag & Drop Visual Indicator */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-50 bg-sky-950/70 backdrop-blur-sm border-2 border-dashed border-[#0284C7] flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <UploadCloud className="w-16 h-16 text-[#38BDF8] animate-bounce mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Lepaskan Foto di Sini
          </h3>
          <p className="text-sm text-sky-100/90 max-w-md">
            File foto (IMG_1880 - IMG_1897) akan otomatis tersimpan dan memperbarui seluruh gambar portofolio.
          </p>
        </div>
      )}

      {/* Sync Success Toast */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#BAE6FD] dark:border-[#0369A1] text-[#0F172A] dark:text-white shadow-2xl shadow-sky-500/20 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-semibold">{syncToast}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GoogleSheetsProvider>
        <ProjectProvider>
          <AppContent />
        </ProjectProvider>
      </GoogleSheetsProvider>
    </ThemeProvider>
  );
}
