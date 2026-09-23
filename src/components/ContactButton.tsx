import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Hubungi Saya',
}) => {
  return (
    <button
      id="contact-me-btn"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold uppercase tracking-widest cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 px-7 py-3 sm:px-9 sm:py-3.5 md:px-11 md:py-4 text-xs sm:text-sm md:text-base shadow-lg shadow-sky-600/20 ${className}`}
      style={{
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      <span>{label}</span>
    </button>
  );
};
