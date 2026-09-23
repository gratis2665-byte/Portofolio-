import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  label = 'Live Project',
  href,
}) => {
  const baseClasses = `inline-flex items-center justify-center rounded-full border-2 border-[#0284C7] text-[#0284C7] bg-white hover:bg-[#E0F2FE]/60 font-semibold uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={onClick}
      >
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <span>{label}</span>
    </button>
  );
};
