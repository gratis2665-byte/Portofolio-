import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Calendar,
  UserCheck,
  Building,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
          className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800 shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Tutup detail proyek"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Image with Gradient overlay */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-md bg-emerald-600/90 text-white mb-2 inline-block">
                {project.category.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-mono">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta badges row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 text-xs">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block font-mono">Peran Alfi:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{project.role}</span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block font-mono">Durasi:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{project.timeline}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-500 dark:text-stone-400 block font-mono">Organisasi/Klien:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{project.clientOrOrg || 'Internal Project'}</span>
              </div>
            </div>

            {/* Comprehensive Description */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Ringkasan Studi Kasus &amp; Masalah
              </h3>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Architecture Highlights */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>Pilar Arsitektur &amp; Solusi Teknis</span>
                </h3>
                <div className="space-y-2">
                  {project.architectureHighlights.map((highlight: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-800 dark:text-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Metrics */}
            {project.impactMetrics && project.impactMetrics.length > 0 && (
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Dampak &amp; Metrik Terukur</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.impactMetrics.map((metric: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 text-xs font-medium text-emerald-950 dark:text-emerald-200"
                    >
                      ⚡ {metric}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Teknologi yang Digunakan
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
                  >
                    <Github className="w-4 h-4" />
                    <span>Lihat Repository GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo / App</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
