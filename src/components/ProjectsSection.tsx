import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Eye,
  Edit3,
  UploadCloud,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { useProjects } from '../context/ProjectContext';
import { ProjectShowcaseItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject?: (project: ProjectShowcaseItem) => void;
  onOpenEditor?: (projectId?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenEditor,
}) => {
  const { projects, isCustomized } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'stack'>('slider');

  const totalProjects = projects.length;
  // Ensure currentIndex stays within bounds if projects are added/deleted
  const safeIndex = Math.min(currentIndex, Math.max(0, totalProjects - 1));
  const activeProject = projects[safeIndex] || projects[0];

  const handleNext = () => {
    if (totalProjects === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    if (totalProjects === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalProjects]);

  if (!activeProject) return null;

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-8 md:px-10 pt-20 pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8] block">
                  Portofolio Unggulan &bull; Studi Kasus Nyata
                </span>
                {isCustomized && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[10px] font-mono text-emerald-400">
                    Kustom (Blogger)
                  </span>
                )}
              </div>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
              >
                Proyek
              </h2>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Karya pilihan yang mencakup simulasi 3D interaktif, platform edukasi pemrograman, workspace kecerdasan buatan, dan sistem identitas brand.
              </p>
            </div>

            {/* View Mode Switcher, Blogger Editor Trigger & Controls */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Blogger Link Customizer Button */}
              {onOpenEditor && (
                <button
                  onClick={() => onOpenEditor(activeProject.id)}
                  className="px-4 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-white border border-[#333333] hover:border-[#B600A8] text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg group"
                  title="Ubah gambar dan detail proyek menggunakan link upload Blogger"
                >
                  <UploadCloud className="w-4 h-4 text-[#B600A8] group-hover:scale-110 transition-transform" />
                  <span>Ubah Proyek (Link Blogger)</span>
                </button>
              )}

              <div className="flex items-center p-1 rounded-full bg-[#181818] border border-[#2A2A2A]">
                <button
                  onClick={() => setViewMode('slider')}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    viewMode === 'slider'
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                      : 'text-[#D7E2EA]/60 hover:text-white'
                  }`}
                >
                  Mode Geser
                </button>
                <button
                  onClick={() => setViewMode('stack')}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    viewMode === 'stack'
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-md'
                      : 'text-[#D7E2EA]/60 hover:text-white'
                  }`}
                >
                  Semua Proyek
                </button>
              </div>

              {/* Slider Arrows */}
              {viewMode === 'slider' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Proyek sebelumnya"
                    className="p-3 rounded-full bg-[#181818] border border-[#2B2B2B] text-[#D7E2EA] hover:bg-[#242424] hover:text-white hover:border-[#B600A8] transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Proyek berikutnya"
                    className="p-3 rounded-full bg-[#181818] border border-[#2B2B2B] text-[#D7E2EA] hover:bg-[#242424] hover:text-white hover:border-[#B600A8] transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Project Quick Tabs in Slider Mode */}
        {viewMode === 'slider' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  safeIndex === idx
                    ? 'bg-white text-black font-bold shadow-lg scale-102'
                    : 'bg-[#161616] text-[#D7E2EA]/60 hover:text-white border border-[#242424]'
                }`}
              >
                <span>{proj.number}</span>
                <span className="truncate max-w-[160px] sm:max-w-[240px]">{proj.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* 1. SLIDER MODE (Swipeable with touch drag & gesture) */}
        {viewMode === 'slider' && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) {
                    handleNext();
                  } else if (info.offset.x > 60) {
                    handlePrev();
                  }
                }}
                className="w-full rounded-[36px] sm:rounded-[48px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-5 sm:p-7 md:p-9 shadow-2xl relative select-none flex flex-col justify-between cursor-grab active:cursor-grabbing overflow-hidden"
              >
                {/* Top Row: Number, Badge, Title & Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className="font-black text-[#D7E2EA] leading-none"
                      style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
                    >
                      {activeProject.number}
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#B600A8]">
                          ({activeProject.category})
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#1C1C1C] border border-[#2A2A2A] text-[10px] font-mono text-[#D7E2EA]/70">
                          {activeProject.badge}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#D7E2EA] tracking-wide leading-tight">
                        {activeProject.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {onOpenEditor && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditor(activeProject.id);
                        }}
                        className="px-3.5 py-2 rounded-full bg-[#1C1C1C] hover:bg-[#282828] text-xs font-mono text-[#D7E2EA] border border-[#2D2D2D] hover:border-[#B600A8] transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Edit gambar Blogger atau info proyek ini"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#B600A8]" />
                        <span className="hidden sm:inline">Ubah Proyek</span>
                      </button>
                    )}
                    <LiveProjectButton
                      label="Buka Detail"
                      onClick={() => onSelectProject?.(activeProject)}
                    />
                  </div>
                </div>

                {/* Tagline & Short Description */}
                <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mb-5 leading-relaxed font-sans max-w-3xl">
                  {activeProject.description}
                </p>

                {/* Tech Stacks */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#181818] border border-[#282828] text-[11px] font-mono text-[#D7E2EA]/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* 2-Column Visual Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch mb-6">
                  {/* Left Column (5 cols) - 2 stacked images */}
                  <div className="md:col-span-5 flex flex-col gap-4 justify-between">
                    <div
                      onClick={() => onSelectProject?.(activeProject)}
                      className="group/img w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#161616] cursor-pointer relative"
                      style={{ height: 'clamp(140px, 16vw, 210px)' }}
                    >
                      <img
                        src={activeProject.col1Img1}
                        alt={`${activeProject.name} pratinjau 1`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                    </div>
                    <div
                      onClick={() => onSelectProject?.(activeProject)}
                      className="group/img w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#161616] cursor-pointer relative"
                      style={{ height: 'clamp(160px, 20vw, 280px)' }}
                    >
                      <img
                        src={activeProject.col1Img2}
                        alt={`${activeProject.name} pratinjau 2`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                    </div>
                  </div>

                  {/* Right Column (7 cols) - 1 tall showcase image */}
                  <div
                    onClick={() => onSelectProject?.(activeProject)}
                    className="group/img md:col-span-7 overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#161616] min-h-[260px] md:min-h-full cursor-pointer relative"
                  >
                    <img
                      src={activeProject.col2Img}
                      alt={`${activeProject.name} tampilan utama`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 opacity-95 group-hover/img:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white flex items-center justify-between w-full">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/80">
                          {activeProject.tagline}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Klik untuk Memperbesar</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Swipe Prompt & Counter */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#222222]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D7E2EA]/50">
                    <Sliders className="w-4 h-4 text-[#B600A8]" />
                    <span>Geser layar ke kiri / kanan atau gunakan tombol panah</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">
                      0{safeIndex + 1} / 0{totalProjects}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {projects.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentIndex(dotIdx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            safeIndex === dotIdx
                              ? 'w-6 bg-gradient-to-r from-[#B600A8] to-[#7621B0]'
                              : 'w-2 bg-[#2B2B2B] hover:bg-[#3D3D3D]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 2. STACKED GRID MODE */}
        {viewMode === 'stack' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => onSelectProject?.(project)}
                className="p-6 sm:p-8 rounded-[36px] bg-[#141414] border border-[#2A2A2A] hover:border-[#3E3E3E] transition-all cursor-pointer flex flex-col justify-between group shadow-xl relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-3xl text-[#D7E2EA] font-mono">
                      {project.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {onOpenEditor && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenEditor(project.id);
                          }}
                          className="p-2 rounded-full bg-[#1C1C1C] hover:bg-[#282828] text-xs font-mono text-[#D7E2EA] border border-[#2D2D2D] hover:border-[#B600A8] transition-all flex items-center gap-1 cursor-pointer"
                          title="Ubah proyek ini dengan link Blogger"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#B600A8]" />
                        </button>
                      )}
                      <span className="px-3 py-1 rounded-full bg-[#1F1F1F] text-[10px] font-mono text-[#B600A8] border border-[#2B2B2B]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-56 rounded-[24px] overflow-hidden bg-[#181818] mb-5">
                    <img
                      src={project.col2Img}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85';
                      }}
                    />
                  </div>

                  <h3 className="text-xl font-bold uppercase text-white group-hover:text-[#B600A8] transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#D7E2EA]/70 leading-relaxed font-sans line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-[#1C1C1C] text-[10px] font-mono text-[#D7E2EA]/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#242424] flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#B600A8]">
                    <span>Buka Detail Proyek</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
