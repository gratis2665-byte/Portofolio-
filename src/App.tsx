import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { GoogleSheetsProvider } from './context/GoogleSheetsContext';
import { ProjectProvider } from './context/ProjectContext';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StatsSection } from './components/StatsSection';
import { TrainingGallerySection } from './components/TrainingGallerySection';
import { TrainingEstimator } from './components/TrainingEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectViewerModal } from './components/ProjectViewerModal';
import { GoogleSheetsManagerModal } from './components/GoogleSheetsManagerModal';
import { BloggerProjectEditorModal } from './components/BloggerProjectEditorModal';
import { CommandMenu } from './components/CommandMenu';
import { ProjectShowcaseItem } from './data/portfolioData';
import { FileSpreadsheet, Terminal, MessageSquare, UploadCloud } from 'lucide-react';

export default function App() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [bloggerModalOpen, setBloggerModalOpen] = useState(false);
  const [editorInitialProjectId, setEditorInitialProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectShowcaseItem | null>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectEditor = (projectId?: string) => {
    setEditorInitialProjectId(projectId || null);
    setBloggerModalOpen(true);
  };

  return (
    <ThemeProvider>
      <GoogleSheetsProvider>
        <ProjectProvider>
          <div
            className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans select-none overflow-x-clip"
            style={{
              fontFamily: "'Kanit', sans-serif",
              overflowX: 'clip',
            }}
          >
            {/* Main Content */}
            <main className="w-full flex flex-col">
              {/* 1. Hero Section */}
              <HeroSection
                onContactClick={() => setContactModalOpen(true)}
                onAboutClick={() => scrollTo('about')}
                onPriceClick={() => scrollTo('estimator')}
                onProjectsClick={() => scrollTo('projects')}
              />

              {/* 2. Marquee Section */}
              <MarqueeSection />

              {/* 3. About Section */}
              <AboutSection onContactClick={() => setContactModalOpen(true)} />

              {/* 4. Services / Programs Section */}
              <ServicesSection
                onInquire={() => {
                  setContactModalOpen(true);
                }}
              />

              {/* 5. Projects Section (Swipeable Slider & Stack with Blogger link support) */}
              <ProjectsSection
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenEditor={handleOpenProjectEditor}
              />

              {/* 6. Impact & Statistics Section */}
              <StatsSection />

              {/* 7. Interactive Training Estimator / Price Section */}
              <TrainingEstimator />

              {/* 8. Photo Gallery Section */}
              <TrainingGallerySection />

              {/* 9. Testimonials Section */}
              <TestimonialsSection />

              {/* 10. Technical Insights & Blog Section */}
              <BlogSection />
            </main>

            {/* Floating Action Dock */}
            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
              {/* Blogger Project Link Editor */}
              <button
                onClick={() => handleOpenProjectEditor()}
                className="p-3 rounded-full bg-[#181818] border border-[#2B2B2B] text-purple-400 hover:bg-[#242424] hover:border-purple-500/60 shadow-xl transition-all cursor-pointer group"
                title="Kelola & Ganti Gambar Proyek (Link Blogger)"
              >
                <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Google Sheets */}
              <button
                onClick={() => setSheetsModalOpen(true)}
                className="p-3 rounded-full bg-[#181818] border border-[#2B2B2B] text-emerald-400 hover:bg-[#242424] hover:border-emerald-500/50 shadow-xl transition-all cursor-pointer group"
                title="Kelola Database Google Sheets"
              >
                <FileSpreadsheet className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Command Palette */}
              <button
                onClick={() => setCommandMenuOpen(true)}
                className="p-3 rounded-full bg-[#181818] border border-[#2B2B2B] text-[#D7E2EA] hover:bg-[#242424] hover:border-purple-500/50 shadow-xl transition-all cursor-pointer group"
                title="Buka Command Palette (Cmd + K)"
              >
                <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Contact Button */}
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-4 py-3 rounded-full text-white font-medium text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Hubungi Alfi</span>
              </button>
            </div>

            {/* Footer */}
            <Footer
              onOpenCommandMenu={() => setCommandMenuOpen(true)}
              onOpenGoogleSheets={() => setSheetsModalOpen(true)}
              onContactClick={() => setContactModalOpen(true)}
            />

            {/* Modals & Overlays */}
            <ContactModal
              isOpen={contactModalOpen}
              onClose={() => setContactModalOpen(false)}
              onOpenGoogleSheets={() => setSheetsModalOpen(true)}
            />

            <ProjectViewerModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onContactClick={() => setContactModalOpen(true)}
              onOpenEditor={handleOpenProjectEditor}
            />

            <GoogleSheetsManagerModal
              isOpen={sheetsModalOpen}
              onClose={() => setSheetsModalOpen(false)}
            />

            <BloggerProjectEditorModal
              isOpen={bloggerModalOpen}
              onClose={() => setBloggerModalOpen(false)}
              initialProjectId={editorInitialProjectId}
            />

            <CommandMenu
              isOpen={commandMenuOpen}
              onClose={() => setCommandMenuOpen(false)}
              onOpenGoogleSheets={() => setSheetsModalOpen(true)}
              onOpenProjectEditor={() => handleOpenProjectEditor()}
            />
          </div>
        </ProjectProvider>
      </GoogleSheetsProvider>
    </ThemeProvider>
  );
}
