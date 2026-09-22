import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onContactClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-14 border-t border-[#1C1C1C] select-none">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#1F1F1F]">
          {/* Left Brand info */}
          <div className="space-y-2">
            <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Alfi
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest max-w-md">
              Trainer &bull; Fasilitator Pelatihan &bull; Public Speaking &bull; Pengembangan Diri
            </p>
          </div>

          {/* Right Action */}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] hover:from-[#c70bb9] hover:to-[#8427c5] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer shrink-0"
            >
              Hubungi Saya
            </button>
          )}
        </div>

        {/* Bottom Metadata & Copyright by Alfi */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 font-mono">
          <div>
            Copyright &copy; {new Date().getFullYear()} by Alfi. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-3">
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
