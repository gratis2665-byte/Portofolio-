import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Github,
  Youtube,
  Twitter,
  Send,
  CheckCircle,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  MapPin,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO, SOCIAL_LINKS, WHATSAPP_TEMPLATES } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { isAuthenticated, logInquiry, activeSpreadsheet, activeSheetName, isSyncing } = useGoogleSheets();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(WHATSAPP_TEMPLATES[0].id);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loggedToSheets, setLoggedToSheets] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'In-House Corporate Training',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const activeTemplate = WHATSAPP_TEMPLATES.find((t: any) => t.id === selectedTemplate) || WHATSAPP_TEMPLATES[0];

  const handleCopyTemplate = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeTemplate.message);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSendViaWhatsApp = () => {
    const encoded = encodeURIComponent(activeTemplate.message);
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // If connected to Google Sheets, log inquiry automatically
    if (isAuthenticated) {
      const success = await logInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        topic: formData.serviceType,
        format: 'Onsite / Hybrid',
        message: formData.message,
        source: 'Web Contact Form',
      });
      if (success) {
        setLoggedToSheets(true);
      }
    }

    const message = `Halo Mas Alfi,

Saya ${formData.name} (${formData.email}) dari ${formData.company || 'Pribadi / Perusahaan'}.
Saya ingin berdiskusi mengenai: ${formData.serviceType}

Pesan:
${formData.message}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Github':
        return <Github className="w-4 h-4" />;
      case 'Youtube':
        return <Youtube className="w-4 h-4" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      case 'Mail':
        return <Mail className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <section id="kontak" className="py-20 md:py-28 bg-stone-100/60 dark:bg-[#141412] border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>KONTAK &amp; DISKUSI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-100 tracking-tight">
            Mulai Kolaborasi &amp;{' '}
            <span className="font-serif italic text-emerald-800 dark:text-emerald-400">
              Konsultasi Pelatihan
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mt-2 text-base max-w-2xl">
            Calon klien korporasi, institusi pendidikan, maupun komunitas teknologi dipersilakan untuk berdiskusi langsung melalui WhatsApp atau formulir di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: WhatsApp Templates & Direct Reach */}
          <div className="lg:col-span-6 space-y-6">
            {/* Direct WhatsApp Quick Hub */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      Templat Cepat Diskusi WhatsApp
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Pilih format pesan agar diskusi lebih efisien dan tepat sasaran
                    </p>
                  </div>
                </div>
              </div>

              {/* Template Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {WHATSAPP_TEMPLATES.map((tpl: any) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                      selectedTemplate === tpl.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-950 dark:text-emerald-200 font-semibold'
                        : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="truncate">{tpl.title}</div>
                  </button>
                ))}
              </div>

              {/* Template Message Preview Box */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300 whitespace-pre-line leading-relaxed mb-4 max-h-48 overflow-y-auto">
                {activeTemplate.message}
              </div>

              {/* WhatsApp Launch Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka Chat WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyTemplate}
                  className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                  title="Salin pesan template"
                >
                  {copiedTemplate ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-mono mb-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Langsung</span>
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate mb-2">
                  {PERSONAL_INFO.email}
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? <span>Email Disalin!</span> : <span>Salin Alamat Email</span>}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-mono mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Waktu Respons</span>
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  &lt; 30 Menit (Jam Kerja)
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Senin - Sabtu (08:00 - 18:00 WIB)
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
                Media Sosial &amp; Jaringan Profesional:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SOCIAL_LINKS.map((soc: any) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800/80 transition-colors text-xs text-stone-700 dark:text-stone-300 font-medium group"
                  >
                    <span className="text-stone-500 group-hover:text-emerald-600 transition-colors">
                      {getSocialIcon(soc.icon)}
                    </span>
                    <span className="truncate">{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800 shadow-2xs">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                Kirim Formulir Pertanyaan / Proposal
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                Isi rincian kebutuhan Anda untuk dihubungi via email dan WhatsApp secara otomatis.
              </p>

              {formSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs mb-6 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Pesan Anda Sedang Diteruskan!</strong> Jendela obrolan WhatsApp telah terbuka. Anda juga dapat mengirim email langsung ke {PERSONAL_INFO.email}.
                    </div>
                  </div>

                  {loggedToSheets && (
                    <div className="flex items-center gap-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Data otomatis tercatat ke Google Sheets: &quot;{activeSpreadsheet?.title || 'Training Hub'}&quot;</span>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-700 dark:text-stone-300 block mb-1.5">
                      Nama Lengkap: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-700 dark:text-stone-300 block mb-1.5">
                      Email Kerja: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@kantor.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-700 dark:text-stone-300 block mb-1.5">
                      Perusahaan / Institusi:
                    </label>
                    <input
                      type="text"
                      placeholder="Nama PT / Kampus"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-700 dark:text-stone-300 block mb-1.5">
                      Jenis Kebutuhan:
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                    >
                      <option value="In-House Corporate Training">In-House Corporate Training</option>
                      <option value="Konsultasi Arsitektur IT & Cloud">Konsultasi Arsitektur IT &amp; Cloud</option>
                      <option value="Keynote Speaker / Kuliah Tamu">Keynote Speaker / Kuliah Tamu</option>
                      <option value="Mentoring Bootcamp / Custom Labs">Mentoring Bootcamp / Custom Labs</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-700 dark:text-stone-300 block mb-1.5">
                    Pesan / Rincian Singkat: <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ceritakan gambaran tim Anda, topik yang ingin didalami, atau jadwal tentatif..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan &amp; Mulai Diskusi</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
