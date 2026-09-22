import React, { useState, useEffect } from 'react';
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

  return (
    <ThemeProvider>
      <GoogleSheetsProvider>
        <ProjectProvider>
          <div
            className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans select-none overflow-x-clip"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              overflowX: 'clip',
            }}
          >
            {/* Slim, elegant reading progress bar */}
            <ReadingProgressBar />

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
            </main>

            {/* Clean Floating Action Dock */}
            <div className="fixed bottom-6 right-6 z-40 flex items-center">
              {/* Contact Button */}
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-5 py-3.5 rounded-full text-white font-medium text-xs uppercase tracking-wider shadow-2xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
                title="Hubungi Alfi"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hubungi Alfi</span>
              </button>
            </div>

            {/* Footer */}
            <Footer
              onContactClick={() => setContactModalOpen(true)}
            />

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
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm border-2 border-dashed border-[#B600A8] flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <UploadCloud className="w-16 h-16 text-[#B600A8] animate-bounce mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Lepaskan Foto di Sini
                </h3>
                <p className="text-sm text-[#D7E2EA]/80 max-w-md">
                  File foto (IMG_1880 - IMG_1897) akan otomatis tersimpan dan memperbarui seluruh gambar portofolio.
                </p>
              </div>
            )}

            {/* Sync Success Toast */}
            {syncToast && (
              <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] text-white shadow-2xl shadow-black/80 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">{syncToast}</span>
              </div>
            )}
          </div>
        </ProjectProvider>
      </GoogleSheetsProvider>
    </ThemeProvider>
  );
}
