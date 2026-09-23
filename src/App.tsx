import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
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
import { SectionReveal } from './components/SectionReveal';
import { ContactModal } from './components/ContactModal';
import { ProjectViewerModal } from './components/ProjectViewerModal';
import { ProjectShowcaseItem } from './data/portfolioData';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { MessageSquare, CheckCircle2, UploadCloud } from 'lucide-react';
import { initPhotoStorage, saveMultiplePhotos } from './utils/photoStorage';

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectShowcaseItem | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    initPhotoStorage();

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

  const mainContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <ThemeProvider>
      <GoogleSheetsProvider>
        <ProjectProvider>
          <div
            className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans select-none overflow-x-clip"
            style={{
              fontFamily: "'Kanit', sans-serif",
              overflowX: 'clip',
            }}
          >
            {/* Slim, elegant reading progress bar */}
            <ReadingProgressBar />

            {/* Main Content with Staggered Fade-In Reveal Container */}
            <motion.main
              variants={mainContainerVariants}
              initial="hidden"
              animate="visible"
              className="w-full flex flex-col"
            >
              {/* 1. Hero Section */}
              <SectionReveal delay={0} yOffset={16} amount={0}>
                <HeroSection
                  onContactClick={() => setContactModalOpen(true)}
                  onAboutClick={() => scrollTo('about')}
                  onGalleryClick={() => scrollTo('galeri')}
                  onProjectsClick={() => scrollTo('projects')}
                />
              </SectionReveal>

              {/* 2. Marquee Section */}
              <SectionReveal delay={0.08} yOffset={24} amount={0}>
                <MarqueeSection />
              </SectionReveal>

              {/* 3. About Section */}
              <SectionReveal delay={0.05} yOffset={32}>
                <AboutSection onContactClick={() => setContactModalOpen(true)} />
              </SectionReveal>

              {/* 4. Projects Section (Swipeable Slider & Stack with pure Trainer projects) */}
              <SectionReveal delay={0.05} yOffset={32}>
                <ProjectsSection
                  onSelectProject={(proj) => setSelectedProject(proj)}
                />
              </SectionReveal>

              {/* 5. Impact & Statistics Section */}
              <SectionReveal delay={0.05} yOffset={32}>
                <StatsSection />
              </SectionReveal>

              {/* 6. Interactive Training Estimator / Price Section */}
              <SectionReveal delay={0.05} yOffset={32}>
                <TrainingEstimator />
              </SectionReveal>

              {/* 7. Photo Gallery Section */}
              <SectionReveal delay={0.05} yOffset={32}>
                <TrainingGallerySection />
              </SectionReveal>

              {/* 8. Technical Insights & Blog Section */}
              <SectionReveal delay={0.05} yOffset={32}>
                <BlogSection />
              </SectionReveal>

              {/* 9. Footer */}
              <SectionReveal delay={0.05} yOffset={24}>
                <Footer
                  onContactClick={() => setContactModalOpen(true)}
                />
              </SectionReveal>
            </motion.main>

            {/* Clean Floating Action Dock */}
            <div className="fixed bottom-6 right-6 z-40 flex items-center">
              {/* Contact Button */}
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-5 py-3.5 rounded-full text-white font-semibold text-xs uppercase tracking-wider shadow-xl shadow-sky-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer bg-[#0284C7] hover:bg-[#0369A1]"
                title="Hubungi Alfi"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hubungi Alfi</span>
              </button>
            </div>

            {/* Modals & Overlays */}
            <ContactModal
              isOpen={contactModalOpen}
              onClose={() => setContactModalOpen(false)}
            />

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
              <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-[#BAE6FD] text-[#0F172A] shadow-2xl shadow-sky-500/20 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold">{syncToast}</span>
              </div>
            )}
          </div>
        </ProjectProvider>
      </GoogleSheetsProvider>
    </ThemeProvider>
  );
}
