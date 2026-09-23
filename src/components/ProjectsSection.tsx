import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { useProjects } from '../context/ProjectContext';
import { ProjectShowcaseItem } from '../data/portfolioData';
import { ProjectSliderSkeleton, ProjectStackSkeleton } from './ProjectCardSkeleton';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ProjectsSectionProps {
  onSelectProject?: (project: ProjectShowcaseItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const { projects, isLoading } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'stack'>('slider');

  const totalProjects = projects.length;
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

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-8 md:px-10 pt-20 pb-32 select-none border-t border-[#BAE6FD]/80 shadow-[0_-20px_40px_-15px_rgba(14,165,233,0.07)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
                Materi &bull; Modul Pelatihan
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
              >
                Modul Pilihan
              </h2>
              <p className="text-[#475569] text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                Koleksi materi belajar, panduan praktik public speaking, dan simulasi yang siap dipakai buat bikin kelas atau tim kamu makin seru dan percaya diri.
              </p>
            </div>

            {/* View Mode Switcher & Controls */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="flex items-center p-1 rounded-full bg-white border border-[#BAE6FD] shadow-xs">
                <button
                  onClick={() => setViewMode('slider')}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    viewMode === 'slider'
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Geser Santai
                </button>
                <button
                  onClick={() => setViewMode('stack')}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    viewMode === 'stack'
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Lihat Semua
                </button>
              </div>

              {/* Slider Arrows */}
              {viewMode === 'slider' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Materi sebelumnya"
                    className="p-3 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] transition-all cursor-pointer active:scale-90 shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Materi berikutnya"
                    className="p-3 rounded-full bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-[#E0F2FE] transition-all cursor-pointer active:scale-90 shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Project Quick Tabs in Slider Mode */}
        {viewMode === 'slider' && !isLoading && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  safeIndex === idx
                    ? 'bg-[#0284C7] text-white font-bold shadow-sm'
                    : 'bg-white text-[#64748B] hover:text-[#0284C7] border border-[#E2E8F0]'
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
            {isLoading ? (
              <ProjectSliderSkeleton />
            ) : activeProject ? (
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
                  className="w-full rounded-[36px] sm:rounded-[48px] border border-[#BAE6FD] bg-white p-6 sm:p-8 md:p-10 shadow-lg shadow-sky-100/40 relative select-none flex flex-col justify-between cursor-grab active:cursor-grabbing overflow-hidden"
                >
                  {/* Top Row: Number, Category, Title & Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className="font-black text-[#0284C7] leading-none"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
                      >
                        {activeProject.number}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-semibold mb-1">
                          {activeProject.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#0F172A] tracking-wide leading-tight">
                          {activeProject.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <LiveProjectButton
                        label="Lihat Detail"
                        onClick={() => onSelectProject?.(activeProject)}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#334155] mb-5 leading-relaxed font-sans max-w-3xl">
                    {activeProject.description}
                  </p>

                  {/* Clean Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[#334155]"
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
                        className="group/img w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#F1F5F9] border border-[#E2E8F0] cursor-pointer relative"
                        style={{ height: 'clamp(140px, 16vw, 210px)' }}
                      >
                        <ImageWithSkeleton
                          src={activeProject.col1Img1}
                          alt={`${activeProject.name} foto 1`}
                          className="group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors pointer-events-none" />
                      </div>
                      <div
                        onClick={() => onSelectProject?.(activeProject)}
                        className="group/img w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#F1F5F9] border border-[#E2E8F0] cursor-pointer relative"
                        style={{ height: 'clamp(160px, 20vw, 280px)' }}
                      >
                        <ImageWithSkeleton
                          src={activeProject.col1Img2}
                          alt={`${activeProject.name} foto 2`}
                          className="group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors pointer-events-none" />
                      </div>
                    </div>

                    {/* Right Column (7 cols) - 1 tall showcase image */}
                    <div
                      onClick={() => onSelectProject?.(activeProject)}
                      className="group/img md:col-span-7 overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#F1F5F9] border border-[#E2E8F0] min-h-[260px] md:min-h-full cursor-pointer relative"
                    >
                      <ImageWithSkeleton
                        src={activeProject.col2Img}
                        alt={`${activeProject.name} foto utama`}
                        showSpinner
                        className="group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 flex items-end p-6 pointer-events-none">
                        <div className="text-white flex items-center justify-between w-full">
                          <span className="text-xs font-mono uppercase tracking-wider text-white/90">
                            {activeProject.tagline}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                            Klik untuk Lihat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Swipe Prompt & Counter */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
                    <div className="text-xs font-mono text-[#64748B]">
                      Bisa digeser ke samping atau pakai tombol panah
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#0F172A]">
                        0{safeIndex + 1} / 0{totalProjects}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {projects.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentIndex(dotIdx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              safeIndex === dotIdx
                                ? 'w-6 bg-[#0284C7]'
                                : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        )}

        {/* 2. STACKED GRID MODE */}
        {viewMode === 'stack' && (
          <div>
            {isLoading ? (
              <ProjectStackSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => onSelectProject?.(project)}
                    className="p-6 sm:p-8 rounded-[36px] bg-white border border-[#E2E8F0] hover:border-[#38BDF8] transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-3xl text-[#0284C7] font-mono">
                          {project.number}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                          {project.category}
                        </span>
                      </div>

                      <div className="w-full h-56 rounded-[24px] overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0] mb-5 relative">
                        <ImageWithSkeleton
                          src={project.col2Img}
                          alt={project.name}
                          showSpinner
                          className="group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <h3 className="text-xl font-bold uppercase text-[#0F172A] group-hover:text-[#0284C7] transition-colors mb-2">
                        {project.name}
                      </h3>
                      <p className="text-xs text-[#475569] leading-relaxed font-sans line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#64748B]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                        <span>Lihat Detail Materi</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
