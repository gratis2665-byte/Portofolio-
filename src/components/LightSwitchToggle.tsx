import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const LightSwitchToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="flex flex-col items-center select-none">
      {/* Wall Switch Plate */}
      <button
        type="button"
        role="switch"
        aria-checked={isLight}
        aria-label={isLight ? "Matikan lampu (Mode Gelap)" : "Nyalakan lampu (Mode Terang)"}
        onClick={toggleTheme}
        className="group relative flex items-center justify-between gap-3 p-1.5 sm:p-2 rounded-2xl cursor-pointer transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 bg-white/90 dark:bg-[#1E293B]/90 border border-[#CBD5E1] dark:border-[#334155] shadow-md dark:shadow-black/40 hover:border-sky-400 dark:hover:border-sky-500"
      >
        {/* Switch Faceplate Plate Bevel */}
        <div className="flex items-center gap-2.5">
          {/* Physical Rocker Switch */}
          <div className="relative w-14 h-7 sm:w-16 sm:h-8 rounded-full p-0.5 sm:p-1 bg-slate-200 dark:bg-slate-800 transition-colors duration-300 shadow-inner flex items-center">
            {/* Illuminated Glow Ring behind rocker when ON (light mode) */}
            {isLight && (
              <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-xs transition-opacity duration-300" />
            )}

            {/* Rocker Paddle */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 z-10 ${
                isLight
                  ? 'translate-x-7 sm:translate-x-8 bg-amber-400 text-slate-900 shadow-amber-400/50'
                  : 'translate-x-0 bg-slate-700 text-sky-200 shadow-slate-900/60'
              }`}
            >
              {isLight ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900" strokeWidth={2.5} />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200" strokeWidth={2.5} />
              )}
            </motion.div>
          </div>

          {/* Switch Indicator Label & Lamp State */}
          <div className="flex flex-col text-left pr-2 font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isLight
                    ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse'
                    : 'bg-slate-500 dark:bg-slate-600'
                }`}
              />
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#0F172A] dark:text-[#F8FAFC]">
                {isLight ? 'Lampu: Nyala' : 'Lampu: Padam'}
              </span>
            </div>
            <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-sans">
              {isLight ? 'Mode Terang Aktif' : 'Mode Gelap Aktif'}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
