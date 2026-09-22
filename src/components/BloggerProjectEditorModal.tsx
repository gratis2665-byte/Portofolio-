import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Image as ImageIcon,
  Link,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  Eye,
  Save,
  HelpCircle,
  UploadCloud,
  Layers,
  Copy,
  Check,
  Code,
  Tag,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { ProjectShowcaseItem } from '../data/portfolioData';

interface BloggerProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}

export const BloggerProjectEditorModal: React.FC<BloggerProjectEditorModalProps> = ({
  isOpen,
  onClose,
  initialProjectId,
}) => {
  const {
    projects,
    updateProject,
    addProject,
    deleteProject,
    resetToDefaultProjects,
    optimizeBloggerUrl,
    isCustomized,
  } = useProjects();

  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showBloggerGuide, setShowBloggerGuide] = useState(true);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  const [newArch, setNewArch] = useState('');
  const [newMetric, setNewMetric] = useState('');

  // Current draft project state
  const [draftProject, setDraftProject] = useState<ProjectShowcaseItem | null>(null);

  // Set initial project when opening or when projects change
  useEffect(() => {
    if (!isOpen) return;

    if (initialProjectId && projects.some((p) => p.id === initialProjectId)) {
      setSelectedProjectId(initialProjectId);
    } else if (projects.length > 0 && !projects.some((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(projects[0].id);
    }
  }, [isOpen, initialProjectId, projects]);

  // Sync draftProject whenever selectedProjectId changes
  useEffect(() => {
    const found = projects.find((p) => p.id === selectedProjectId);
    if (found) {
      setDraftProject(JSON.parse(JSON.stringify(found)));
    } else if (projects.length > 0) {
      setDraftProject(JSON.parse(JSON.stringify(projects[0])));
      setSelectedProjectId(projects[0].id);
    }
  }, [selectedProjectId, projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  if (!isOpen || !draftProject) return null;

  const isBloggerUrl = (url: string) => {
    if (!url) return false;
    return (
      url.includes('blogger.googleusercontent.com') ||
      url.includes('.bp.blogspot.com') ||
      url.includes('googleusercontent.com')
    );
  };

  const handleFieldChange = (field: keyof ProjectShowcaseItem, value: any) => {
    setDraftProject((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleImageUrlChange = (
    field: 'col1Img1' | 'col1Img2' | 'col2Img',
    rawUrl: string
  ) => {
    const optimized = optimizeBloggerUrl(rawUrl);
    handleFieldChange(field, optimized);
  };

  const handleSave = () => {
    if (!draftProject) return;

    if (!draftProject.name.trim()) {
      alert('Nama proyek tidak boleh kosong.');
      return;
    }

    updateProject(draftProject.id, draftProject);
    showToast(`Proyek "${draftProject.name}" berhasil diperbarui & disimpan!`);
  };

  const handleAddNewProject = () => {
    const nextNumber = String(projects.length + 1).padStart(2, '0');
    const newId = `custom-project-${Date.now()}`;
    const newProj: ProjectShowcaseItem = {
      id: newId,
      number: nextNumber,
      category: 'Teknologi & Cloud Native',
      badge: 'Baru: 2026',
      name: 'Proyek Kustom Baru',
      subtitle: 'Platform Aplikasi Cloud & Sistem Modern',
      tagline: 'Solusi teknologi berkinerja tinggi dengan arsitektur modern.',
      description:
        'Deskripsi proyek yang dapat Anda sesuaikan sepenuhnya menggunakan foto hasil unggahan Blogger / Blogspot.',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Cloud Native'],
      impactMetrics: [
        'Peningkatan efisiensi sistem hingga 40%',
        'Latensi respon berkurang drastis < 50ms',
        'Kepuasan pengguna mencapai 99%',
      ],
      architectureHighlights: [
        'Arsitektur modular dengan skalabilitas horizontal tinggi',
        'Sistem keamanan berlapis dan pemantauan real-time',
      ],
      col1Img1:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
      col1Img2:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
      col2Img:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
      ctaText: 'Jelajahi Proyek',
    };

    addProject(newProj);
    setSelectedProjectId(newId);
    showToast('Proyek baru berhasil ditambahkan! Silakan sesuaikan link gambar Blogger.');
  };

  const handleDeleteCurrent = () => {
    if (projects.length <= 1) {
      alert('Minimal harus menyisakan 1 proyek dalam portofolio.');
      return;
    }

    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus proyek "${draftProject.name}"?`
      )
    ) {
      deleteProject(draftProject.id);
      const remaining = projects.filter((p) => p.id !== draftProject.id);
      if (remaining.length > 0) {
        setSelectedProjectId(remaining[0].id);
      }
      showToast('Proyek berhasil dihapus.');
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        'Kembalikan semua proyek ke tampilan default awal (4 Proyek Bawaan)?'
      )
    ) {
      resetToDefaultProjects();
      showToast('Seluruh proyek telah dikembalikan ke data default.');
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim() || !draftProject) return;
    if (!draftProject.technologies.includes(newTag.trim())) {
      handleFieldChange('technologies', [...draftProject.technologies, newTag.trim()]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (indexToRemove: number) => {
    if (!draftProject) return;
    handleFieldChange(
      'technologies',
      draftProject.technologies.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleAddArchitecture = () => {
    if (!newArch.trim() || !draftProject) return;
    handleFieldChange('architectureHighlights', [
      ...(draftProject.architectureHighlights || []),
      newArch.trim(),
    ]);
    setNewArch('');
  };

  const handleRemoveArchitecture = (idx: number) => {
    if (!draftProject) return;
    handleFieldChange(
      'architectureHighlights',
      (draftProject.architectureHighlights || []).filter((_, i) => i !== idx)
    );
  };

  const handleAddMetric = () => {
    if (!newMetric.trim() || !draftProject) return;
    handleFieldChange('impactMetrics', [
      ...(draftProject.impactMetrics || []),
      newMetric.trim(),
    ]);
    setNewMetric('');
  };

  const handleRemoveMetric = (idx: number) => {
    if (!draftProject) return;
    handleFieldChange(
      'impactMetrics',
      (draftProject.impactMetrics || []).filter((_, i) => i !== idx)
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
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
          className="relative w-full max-w-5xl bg-[#121212] border border-[#2B2B2B] rounded-[36px] p-5 sm:p-7 md:p-9 text-[#D7E2EA] shadow-2xl z-10 my-6 max-h-[92vh] overflow-y-auto"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-white/20"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#242424]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#1E1E1E] text-[#B600A8] border border-[#2A2A2A]">
                  <UploadCloud className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B600A8]">
                  Kustomisasi Portofolio &bull; Blogger Upload Engine
                </span>
              </div>
              <h2 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Kelola Proyek &amp; Link Gambar Blogger
              </h2>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 max-w-2xl font-sans">
                Ubah gambar proyek menggunakan link foto hasil upload di <strong>Blogger / Blogspot</strong>. Gambar otomatis dioptimalkan ke resolusi tajam (HD).
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#1C1C1C] text-[#D7E2EA] hover:bg-[#282828] hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Blogger Step-by-Step Guide Banner */}
          <div className="mt-6 rounded-2xl bg-[#181818] border border-[#2B2B2B] p-4 sm:p-5">
            <div
              onClick={() => setShowBloggerGuide(!showBloggerGuide)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                  Panduan: Cara Mengambil Link Gambar dari Blogger / Blogspot
                </h3>
              </div>
              <button className="text-xs text-[#D7E2EA]/60 flex items-center gap-1 font-mono">
                <span>{showBloggerGuide ? 'Sembunyikan' : 'Lihat Panduan'}</span>
                {showBloggerGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showBloggerGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-[#262626] space-y-3 text-xs text-[#D7E2EA]/80"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#2C2C2C] space-y-1">
                    <span className="w-5 h-5 rounded-full bg-[#B600A8] text-white text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <strong className="text-white block">Unggah Foto ke Blogger</strong>
                    <p className="text-[11px] text-[#D7E2EA]/70">
                      Buka draf postingan di Blogger.com, klik ikon <em>"Sisipkan Gambar"</em> &rarr; <em>"Upload dari Komputer"</em>.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#2C2C2C] space-y-1">
                    <span className="w-5 h-5 rounded-full bg-[#7621B0] text-white text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <strong className="text-white block">Salin Alamat Gambar</strong>
                    <p className="text-[11px] text-[#D7E2EA]/70">
                      Klik kanan pada gambar yang sudah masuk di Blogger, pilih <strong>"Salin Alamat Gambar" (Copy Image Address)</strong>.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#2C2C2C] space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <strong className="text-white block">Tempel (Paste) di Sini</strong>
                    <p className="text-[11px] text-[#D7E2EA]/70">
                      Tempel link ke kolom Gambar 1, 2, atau 3 di bawah. Link otomatis dioptimasi ke HD (<code>/s1600/</code>).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <span className="text-[11px] font-mono text-emerald-400">
                    &bull; Contoh format: <code>https://blogger.googleusercontent.com/img/b/...</code> atau <code>https://1.bp.blogspot.com/...</code>
                  </span>
                  <a
                    href="https://draft.blogger.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#B600A8] hover:underline"
                  >
                    <span>Buka Dashboard Blogger.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Project Selector Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-[#171717] p-3 rounded-2xl border border-[#282828]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full sm:max-w-xl">
              <span className="text-xs font-mono uppercase text-[#D7E2EA]/50 shrink-0 px-1">
                Pilih Proyek:
              </span>
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    selectedProjectId === proj.id
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-bold shadow-md'
                      : 'bg-[#222222] text-[#D7E2EA]/70 hover:text-white hover:bg-[#2C2C2C]'
                  }`}
                >
                  <span>{proj.number}</span>
                  <span className="truncate max-w-[120px]">{proj.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddNewProject}
                className="px-3.5 py-1.5 rounded-xl bg-[#242424] hover:bg-[#303030] text-white border border-[#333333] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Tambah Proyek Baru"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tambah Proyek</span>
              </button>

              {projects.length > 1 && (
                <button
                  onClick={handleDeleteCurrent}
                  className="p-2 rounded-xl bg-[#242424] hover:bg-rose-950/70 text-rose-400 border border-[#333333] transition-colors cursor-pointer"
                  title="Hapus Proyek Ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main Editor Body: 2 Columns */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Column: Image URLs & Project Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* SECTION A: Blogger Image URLs (3 Slots) */}
              <div className="p-5 rounded-[28px] bg-[#161616] border border-[#262626] space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#B600A8]" />
                    <span>Link Gambar Proyek (Blogger / Blogspot)</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                    3 Slot Gambar
                  </span>
                </div>

                {/* Slot 1: Col 1 Img 1 */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-[#1C1C1C] border border-[#2E2E2E]">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-mono uppercase font-semibold text-[#D7E2EA] flex items-center gap-1.5">
                      <span>Gambar 1 (Kolom Kiri Atas):</span>
                    </label>
                    {isBloggerUrl(draftProject.col1Img1) && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Blogger HD Ready</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="Tempel link gambar Blogger di sini (https://blogger.googleusercontent.com/...)"
                      value={draftProject.col1Img1}
                      onChange={(e) => handleImageUrlChange('col1Img1', e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#333333] text-xs text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                    />
                    <a
                      href={draftProject.col1Img1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#242424] hover:bg-[#303030] text-[#D7E2EA] text-xs"
                      title="Uji buka gambar di tab baru"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Thumbnail Preview */}
                  {draftProject.col1Img1 && (
                    <div className="h-24 w-full rounded-xl overflow-hidden bg-[#101010] border border-[#2B2B2B] relative">
                      <img
                        src={draftProject.col1Img1}
                        alt="Preview Gambar 1"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Slot 2: Col 1 Img 2 */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-[#1C1C1C] border border-[#2E2E2E]">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-mono uppercase font-semibold text-[#D7E2EA] flex items-center gap-1.5">
                      <span>Gambar 2 (Kolom Kiri Bawah):</span>
                    </label>
                    {isBloggerUrl(draftProject.col1Img2) && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Blogger HD Ready</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="Tempel link gambar Blogger di sini (https://blogger.googleusercontent.com/...)"
                      value={draftProject.col1Img2}
                      onChange={(e) => handleImageUrlChange('col1Img2', e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#333333] text-xs text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                    />
                    <a
                      href={draftProject.col1Img2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#242424] hover:bg-[#303030] text-[#D7E2EA] text-xs"
                      title="Uji buka gambar di tab baru"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {draftProject.col1Img2 && (
                    <div className="h-24 w-full rounded-xl overflow-hidden bg-[#101010] border border-[#2B2B2B] relative">
                      <img
                        src={draftProject.col1Img2}
                        alt="Preview Gambar 2"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Slot 3: Col 2 Img (Main Showcase) */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-[#1C1C1C] border border-[#2E2E2E]">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-mono uppercase font-semibold text-[#D7E2EA] flex items-center gap-1.5">
                      <span>Gambar 3 (Showcase Utama Kolom Kanan):</span>
                    </label>
                    {isBloggerUrl(draftProject.col2Img) && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Blogger HD Ready</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="Tempel link gambar Blogger di sini (https://blogger.googleusercontent.com/...)"
                      value={draftProject.col2Img}
                      onChange={(e) => handleImageUrlChange('col2Img', e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#333333] text-xs text-white placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8]"
                    />
                    <a
                      href={draftProject.col2Img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#242424] hover:bg-[#303030] text-[#D7E2EA] text-xs"
                      title="Uji buka gambar di tab baru"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {draftProject.col2Img && (
                    <div className="h-32 w-full rounded-xl overflow-hidden bg-[#101010] border border-[#2B2B2B] relative">
                      <img
                        src={draftProject.col2Img}
                        alt="Preview Gambar Utama"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION B: Text Information & Metadata */}
              <div className="p-5 rounded-[28px] bg-[#161616] border border-[#262626] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#7621B0]" />
                  <span>Detail Informasi &amp; Konten Proyek</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                      Nomor Urut (Contoh: 01, 02):
                    </label>
                    <input
                      type="text"
                      value={draftProject.number}
                      onChange={(e) => handleFieldChange('number', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                      Kategori Proyek:
                    </label>
                    <input
                      type="text"
                      value={draftProject.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      placeholder="Contoh: AI Workspace / Cloud Native"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Label Badge (Contoh: [2026] Live Production):
                  </label>
                  <input
                    type="text"
                    value={draftProject.badge}
                    onChange={(e) => handleFieldChange('badge', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Nama / Judul Proyek:
                  </label>
                  <input
                    type="text"
                    value={draftProject.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white font-bold focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Subtitle / Fokus Sistem:
                  </label>
                  <input
                    type="text"
                    value={draftProject.subtitle}
                    onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Tagline Singkat:
                  </label>
                  <input
                    type="text"
                    value={draftProject.tagline}
                    onChange={(e) => handleFieldChange('tagline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Deskripsi Lengkap Proyek:
                  </label>
                  <textarea
                    rows={3}
                    value={draftProject.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8] resize-y"
                  />
                </div>

                {/* Tech Stacks Tag Input */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Teknologi &amp; Stack:
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {draftProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#242424] border border-[#333333] text-[11px] font-mono text-[#D7E2EA] flex items-center gap-1.5"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => handleRemoveTag(idx)}
                          className="text-rose-400 hover:text-white"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ketik teknologi baru (misal: Docker, Next.js)..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3.5 py-2 rounded-xl bg-[#282828] hover:bg-[#343434] text-xs font-mono text-white transition-colors"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Sorotan Arsitektur:
                  </label>
                  <div className="space-y-1.5 mb-2">
                    {draftProject.architectureHighlights?.map((arch, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#1C1C1C] text-xs text-[#D7E2EA]/90 border border-[#2B2B2B]"
                      >
                        <span className="truncate pr-2">{arch}</span>
                        <button
                          onClick={() => handleRemoveArchitecture(idx)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tambah poin sorotan arsitektur..."
                      value={newArch}
                      onChange={(e) => setNewArch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddArchitecture();
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                    />
                    <button
                      onClick={handleAddArchitecture}
                      className="px-3.5 py-2 rounded-xl bg-[#282828] hover:bg-[#343434] text-xs font-mono text-white transition-colors"
                    >
                      + Poin
                    </button>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#D7E2EA]/70 block mb-1">
                    Metrik Hasil / Dampak:
                  </label>
                  <div className="space-y-1.5 mb-2">
                    {draftProject.impactMetrics?.map((met, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#1C1C1C] text-xs text-[#D7E2EA]/90 border border-[#2B2B2B]"
                      >
                        <span className="truncate pr-2">{met}</span>
                        <button
                          onClick={() => handleRemoveMetric(idx)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tambah metrik pencapaian (misal: 60 FPS, 5.000+ pengguna)..."
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddMetric();
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1C1C1C] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#B600A8]"
                    />
                    <button
                      onClick={handleAddMetric}
                      className="px-3.5 py-2 rounded-xl bg-[#282828] hover:bg-[#343434] text-xs font-mono text-white transition-colors"
                    >
                      + Metrik
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Mockup Preview & Action Controls */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-4">
              <div className="p-5 rounded-[28px] bg-[#161616] border border-[#262626] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Pratinjau Langsung Kartu Proyek</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#D7E2EA]/50">
                    Live Rendering
                  </span>
                </div>

                {/* Mini Mockup Card */}
                <div className="rounded-[28px] border border-[#383838] bg-[#0C0C0C] p-4 text-[#D7E2EA] shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-2xl text-white font-mono">
                      {draftProject.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#B600A8]">
                      ({draftProject.category})
                    </span>
                  </div>

                  <h4 className="text-sm font-bold uppercase text-white tracking-wide">
                    {draftProject.name}
                  </h4>

                  <p className="text-[11px] text-[#D7E2EA]/70 line-clamp-2">
                    {draftProject.description}
                  </p>

                  {/* 2-Column Mini Preview */}
                  <div className="grid grid-cols-12 gap-2 h-36">
                    <div className="col-span-5 flex flex-col gap-1.5">
                      <div className="h-full rounded-xl overflow-hidden bg-[#181818]">
                        <img
                          src={draftProject.col1Img1}
                          alt="G1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-full rounded-xl overflow-hidden bg-[#181818]">
                        <img
                          src={draftProject.col1Img2}
                          alt="G2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="col-span-7 rounded-xl overflow-hidden bg-[#181818]">
                      <img
                        src={draftProject.col2Img}
                        alt="G3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {draftProject.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#1C1C1C] text-[9px] font-mono text-[#D7E2EA]/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Save & Action Buttons */}
              <div className="p-5 rounded-[28px] bg-[#161616] border border-[#262626] space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full py-3.5 rounded-full text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Proyek</span>
                </button>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleResetAll}
                    className="flex-1 py-2.5 rounded-full bg-[#202020] hover:bg-[#2A2A2A] text-[#D7E2EA]/70 hover:text-white border border-[#303030] text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Kembalikan semua proyek ke konfigurasi awal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>

                  <button
                    onClick={() => {
                      setJsonInput(JSON.stringify(projects, null, 2));
                      setShowJsonModal(true);
                    }}
                    className="py-2.5 px-4 rounded-full bg-[#202020] hover:bg-[#2A2A2A] text-[#D7E2EA]/70 hover:text-white border border-[#303030] text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Ekspor / Impor JSON"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                </div>

                {isCustomized && (
                  <p className="text-[11px] text-emerald-400/80 font-mono text-center pt-1">
                    &bull; Menggunakan proyek kustom dari penyimpanan lokal Anda.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* JSON Export/Import Sub-Modal */}
        {showJsonModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-[#161616] border border-[#333333] rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase font-mono">
                  Ekspor / Impor Data Proyek (JSON)
                </h3>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="p-1 rounded-full bg-[#242424] text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={12}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#0F0F0F] border border-[#2B2B2B] font-mono text-xs text-[#D7E2EA] focus:outline-none"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(jsonInput);
                    alert('Data JSON berhasil disalin ke clipboard!');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#242424] text-xs font-mono flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin JSON</span>
                </button>

                <button
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(jsonInput);
                      if (Array.isArray(parsed)) {
                        localStorage.setItem(
                          'alfi_portfolio_custom_projects_v1',
                          JSON.stringify(parsed)
                        );
                        window.location.reload();
                      } else {
                        alert('Format JSON harus berupa Array proyek.');
                      }
                    } catch (err) {
                      alert('JSON tidak valid. Periksa kembali formatnya.');
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-xs font-bold uppercase"
                >
                  Terapkan &amp; Muat Ulang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
