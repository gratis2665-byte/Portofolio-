import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onContactClick,
}) => {
  const scrollToTop = () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#F8FAFC] dark:bg-[#080E1A] text-[#0F172A] dark:text-[#F8FAFC] pt-20 pb-14 border-t border-[#BAE6FD]/80 dark:border-[#1E293B] select-none">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          {/* Left Brand info */}
          <div className="space-y-2">
            <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Alfi
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest max-w-md">
              Trainer &bull; Fasilitator Pelatihan &bull; Public Speaking &bull; Pengembangan Diri
            </p>
          </div>

          {/* Right Action */}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-sky-600/20 cursor-pointer shrink-0 hover:scale-105"
            >
              Hubungi Saya
            </button>
          )}
        </div>

        {/* Bottom Metadata & Copyright by Alfi */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
          <div>
            Copyright &copy; {new Date().getFullYear()} by Alfi. Seluruh hak cipta dilindungi.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1E293B] hover:bg-[#F0F9FF] dark:hover:bg-[#334155] text-[#0369A1] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#334155] transition-colors cursor-pointer text-[11px] shadow-sm font-semibold"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
