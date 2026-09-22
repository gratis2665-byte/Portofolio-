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
      className={`relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 px-7 py-3 sm:px-9 sm:py-3.5 md:px-11 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      <span>{label}</span>
    </button>
  );
};
