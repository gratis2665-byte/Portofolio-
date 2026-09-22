import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Layers,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Moon,
  Sun,
  ArrowRight,
  User,
  TrendingUp,
  FileSpreadsheet,
  UploadCloud,
  Edit3,
} from 'lucide-react';
import { PROJECTS, TRAINING_PROGRAMS, BLOG_POSTS, PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useGoogleSheets } from '../context/GoogleSheetsContext';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onSelectBlog?: (blogId: string) => void;
  onOpenGoogleSheets?: () => void;
  onOpenProjectEditor?: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectBlog,
  onOpenGoogleSheets,
  onOpenProjectEditor,
}) => {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, activeSpreadsheet } = useGoogleSheets();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open menu handled by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPrograms = TRAINING_PROGRAMS.filter((prog) =>
    prog.title.toLowerCase().includes(query.toLowerCase()) ||
    prog.targetAudience.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlogs = BLOG_POSTS.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleNavigate = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    onClose();
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs"
        />

        {/* Menu Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-white dark:bg-stone-950 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10"
        >
          {/* Search Bar */}
          <div className="flex items-center px-4 border-b border-stone-200 dark:border-stone-800">
            <Search className="w-5 h-5 text-stone-400 shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Ketik perintah atau cari proyek, silabus, artikel, blogger..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full py-4 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 ml-2 text-[10px] font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 text-xs">
            {/* Quick Actions */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2 block mb-1">
                Aksi Cepat &bull; Quick Actions
              </span>
              <div className="space-y-1">
                {onOpenProjectEditor && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectEditor();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-800 dark:text-purple-300 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <UploadCloud className="w-4 h-4 text-purple-600" />
                      <span>Ubah Gambar Proyek (Link Upload Blogger)</span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-600">Blogger</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenGoogleSheets) onOpenGoogleSheets();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isAuthenticated ? `Buka Google Sheets: ${activeSpreadsheet?.title || 'Data Hub'}` : 'Hubungkan & Buka Google Sheets Hub'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600">Sheets</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Chat WhatsApp Langsung dengan Alfi</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600">Buka WA</span>
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-500" />}
                    <span>Ganti ke Mode {theme === 'dark' ? 'Terang' : 'Gelap'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">Toggle</span>
                </button>
              </div>
            </div>

            {/* Training Programs */}
            {filteredPrograms.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2 block mb-1">
                  Program Pelatihan &amp; Silabus ({filteredPrograms.length})
                </span>
                <div className="space-y-1">
                  {filteredPrograms.map((prog) => (
                    <button
                      key={prog.id}
                      onClick={() => handleNavigate('pelatihan')}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate font-medium">{prog.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">{prog.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2 block mb-1">
                  Portofolio Proyek ({filteredProjects.length})
                </span>
                <div className="space-y-1">
                  {filteredProjects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleNavigate('proyek')}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Layers className="w-4 h-4 text-stone-400 shrink-0" />
                        <span className="truncate font-medium">{proj.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0 uppercase">{proj.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Articles */}
            {filteredBlogs.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2 block mb-1">
                  Artikel Blog &amp; Wawasan ({filteredBlogs.length})
                </span>
                <div className="space-y-1">
                  {filteredBlogs.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleNavigate('blog')}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen className="w-4 h-4 text-stone-400 shrink-0" />
                        <span className="truncate font-medium">{b.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">{b.readTime}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>Gunakan panah untuk navigasi</span>
            <span>ESC untuk menutup</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
