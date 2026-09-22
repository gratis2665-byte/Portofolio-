import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Sparkles,
  Layers,
  Box,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Edit3,
  UploadCloud,
} from 'lucide-react';
import { ProjectShowcaseItem } from '../data/portfolioData';

interface ProjectViewerModalProps {
  project: ProjectShowcaseItem | null;
  onClose: () => void;
  onContactClick?: () => void;
  onOpenEditor?: (projectId: string) => void;
}

export const ProjectViewerModal: React.FC<ProjectViewerModalProps> = ({
  project,
  onClose,
  onContactClick,
  onOpenEditor,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#121212] border border-[#2A2A2A] rounded-[36px] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#1F1F1F] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer z-20"
            aria-label="Tutup pratinjau proyek"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pr-12">
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="font-black text-[#D7E2EA] leading-none font-mono"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                {project.number}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#B600A8]">
                    ({project.category})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E1E1E] text-[10px] font-mono text-emerald-400 border border-[#2A2A2A]">
                    {project.badge}
                  </span>
                </div>
                <h2 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  {project.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">{project.subtitle}</p>
              </div>
            </div>

            {onOpenEditor && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEditor(project.id);
                }}
                className="px-4 py-2 rounded-full bg-[#1F1F1F] hover:bg-[#2A2A2A] text-xs font-mono text-white border border-[#333333] hover:border-[#B600A8] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                title="Ganti foto Blogger atau edit konten proyek ini"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>Ganti Gambar (Blogger)</span>
              </button>
            )}
          </div>

          {/* Main Visual Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="rounded-[24px] overflow-hidden bg-[#181818] border border-[#262626] h-[160px] sm:h-[190px]">
                <img
                  src={project.col1Img1}
                  alt={`${project.name} preview 1`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
              </div>
              <div className="rounded-[24px] overflow-hidden bg-[#181818] border border-[#262626] h-[160px] sm:h-[190px]">
                <img
                  src={project.col1Img2}
                  alt={`${project.name} preview 2`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-7 rounded-[24px] overflow-hidden bg-[#181818] border border-[#262626] min-h-[280px]">
              <img
                src={project.col2Img}
                alt={`${project.name} main view`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85';
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-[#181818] border border-[#262626] mb-6">
            <p className="text-sm text-[#D7E2EA]/90 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Architecture Highlights & Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Architecture Highlights */}
            <div className="p-5 rounded-2xl bg-[#181818] border border-[#262626] space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Sorotan Arsitektur &amp; Teknologi</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#D7E2EA]/85">
                {project.architectureHighlights?.map((arch, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-[#B600A8] font-bold">&bull;</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Metrics */}
            <div className="p-5 rounded-2xl bg-[#181818] border border-[#262626] space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#B600A8] flex items-center gap-2 font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>Hasil &amp; Metrik Terverifikasi</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#D7E2EA]/85">
                {project.impactMetrics?.map((metric, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stacks */}
          <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] mb-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA]/60 block mb-2">
              Teknologi &amp; Framework:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#222222] border border-[#2E2E2E] text-xs font-mono text-[#D7E2EA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#262626]">
            <p className="text-xs text-[#D7E2EA]/60">
              Desain sistem enterprise berstandar industri dengan performa dan skalabilitas tinggi.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/40 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  onClose();
                  onContactClick?.();
                }}
                className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-white cursor-pointer transition-all hover:scale-105 flex items-center gap-1.5"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <span>Diskusi Solusi Serupa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
