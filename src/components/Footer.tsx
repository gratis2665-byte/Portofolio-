import React from 'react';
import { ArrowUp, Mail, Linkedin, Github, Youtube, MessageSquare, FileSpreadsheet, Command } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCommandMenu?: () => void;
  onOpenGoogleSheets?: () => void;
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCommandMenu,
  onOpenGoogleSheets,
  onContactClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-14 border-t border-[#1C1C1C] select-none">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#1F1F1F]">
          {/* Left Brand info */}
          <div className="space-y-3">
            <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Alfi
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest max-w-sm">
              Spesialis IT &bull; Arsitek Cloud Native &bull; Principal Technical Trainer
            </p>
          </div>

          {/* Navigation Links in Indonesian */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/80 font-medium">
            <a href="#hero" className="hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              Tentang
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Layanan
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Proyek
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              Estimasi
            </a>
            <button
              onClick={onContactClick}
              className="hover:text-[#B600A8] transition-colors cursor-pointer text-inherit uppercase font-medium tracking-wider"
            >
              Kontak
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Copyright by Alfi */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 font-mono">
          <div>
            Copyright &copy; {new Date().getFullYear()} by Alfi. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-3">
            {onOpenGoogleSheets && (
              <button
                onClick={onOpenGoogleSheets}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818] hover:bg-[#242424] text-emerald-400 border border-[#2A2A2A] transition-colors cursor-pointer text-[11px]"
                title="Buka Pusat Data Google Sheets"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Google Sheets</span>
              </button>
            )}

            {onOpenCommandMenu && (
              <button
                onClick={onOpenCommandMenu}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818] hover:bg-[#242424] text-[#D7E2EA] border border-[#2A2A2A] transition-colors cursor-pointer text-[11px]"
                title="Buka Palet Perintah"
              >
                <Command className="w-3.5 h-3.5" />
                <span>Cmd + K</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818] hover:bg-[#242424] text-[#D7E2EA] border border-[#2A2A2A] transition-colors cursor-pointer text-[11px]"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
