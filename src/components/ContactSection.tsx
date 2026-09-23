import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Youtube,
  Twitter,
  MessageSquare,
  Check,
  Copy,
  ArrowUpRight,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { PERSONAL_INFO, SOCIAL_LINKS, WHATSAPP_TEMPLATES } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { isAuthenticated, logInquiry } = useGoogleSheets();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(WHATSAPP_TEMPLATES[0].id);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'Workshop Public Speaking & Penguasaan Panggung',
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

    if (isAuthenticated) {
      await logInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        topic: formData.serviceType,
        format: 'Onsite / Online',
        message: formData.message,
        source: 'Formulir Kontak Web',
      });
    }

    const message = `Halo Alfi,

Saya ${formData.name} (${formData.email}) dari ${formData.company || 'Pribadi / Tim'}.
Saya ingin ngobrol seputar: ${formData.serviceType}

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
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F0F7FF]/50 border-t border-[#E2E8F0] select-none relative z-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
            Obrolan &bull; Terhubung Langsung
          </span>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-[#0F172A]"
            style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
          >
            Yuk Ngobrol
          </h2>
          <p className="text-[#475569] mt-3 text-xs sm:text-sm max-w-xl leading-relaxed">
            Mau bikin workshop seru di kantor, kampus, atau butuh mentoring privat? Langsung kirim pesan lewat WhatsApp atau isi formulir singkat di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: WhatsApp Templates & Direct Reach */}
          <div className="lg:col-span-6 space-y-6">
            {/* Direct WhatsApp Quick Hub */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#BAE6FD] shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
                  Pesan Cepat WhatsApp
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Tinggal pilih topik yang sesuai, pesannya sudah siap dikirim
                </p>
              </div>

              {/* Template Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {WHATSAPP_TEMPLATES.map((tpl: any) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                      selectedTemplate === tpl.id
                        ? 'bg-sky-50 border-[#0284C7] text-[#0284C7] font-semibold shadow-xs'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-sky-300'
                    }`}
                  >
                    <div className="truncate">{tpl.title}</div>
                  </button>
                ))}
              </div>

              {/* Template Message Preview Box */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#334155] whitespace-pre-line leading-relaxed mb-4 max-h-48 overflow-y-auto">
                {activeTemplate.message}
              </div>

              {/* WhatsApp Launch Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="flex-1 py-3 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyTemplate}
                  className="p-3 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] transition-colors cursor-pointer"
                  title="Salin pesan"
                >
                  {copiedTemplate ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[#64748B] text-xs font-mono mb-1">
                  Email Langsung
                </div>
                <div className="text-xs font-semibold text-[#0F172A] truncate mb-2">
                  {PERSONAL_INFO.email}
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs font-medium text-[#0284C7] hover:underline cursor-pointer"
                >
                  {copiedEmail ? <span>Email Berhasil Disalin!</span> : <span>Salin Alamat Email</span>}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[#64748B] text-xs font-mono mb-1">
                  Waktu Balas
                </div>
                <div className="text-xs font-semibold text-[#0F172A] mb-1">
                  Cepat &amp; Responsif
                </div>
                <p className="text-xs text-[#64748B]">
                  Senin — Sabtu (08:00 — 20:00 WIB)
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-3">
                Media Sosial:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SOCIAL_LINKS.map((soc: any) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-sky-50 border border-[#E2E8F0] transition-colors text-xs text-[#334155] font-medium group"
                  >
                    <span className="text-[#64748B] group-hover:text-[#0284C7] transition-colors">
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
            <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#BAE6FD] shadow-sm">
              <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide mb-1">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                Tulis kebutuhanmu di sini, nanti pesannya otomatis siap di WhatsApp.
              </p>

              {formSubmitted && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-[#0369A1] text-xs mb-6 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <div>
                      <strong>Pesan Sedang Disiapkan!</strong> Jendela chat WhatsApp sudah terbuka. Kamu juga bisa kirim email langsung ke {PERSONAL_INFO.email}.
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                      Nama Kamu: <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                      Email Kamu: <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@kamu.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                      Kantor / Kampus / Komunitas:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: BEM Kampus / Tim HR"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                      Topik yang Diminati:
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                    >
                      <option value="Workshop Public Speaking & Penguasaan Panggung">Workshop Public Speaking &amp; Panggung</option>
                      <option value="Pelatihan Komunikasi Efektif & Tim (TeamSync)">Komunikasi Tim (TeamSync)</option>
                      <option value="Ice Breaking Seru & Fasilitasi Interaktif">Ice Breaking Seru (IceBreak Pro)</option>
                      <option value="Mentoring Privat 1-on-1 (Sidang / Interview)">Mentoring Privat 1-on-1</option>
                      <option value="Sesi Sharing Santai / Lainnya">Sesi Santai / Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#334155] block mb-1.5">
                    Ceritakan Singkat: <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ceritakan tentang tim kamu, rencana waktu sesi, atau hal yang ingin dilatih bareng..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Alfi</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
