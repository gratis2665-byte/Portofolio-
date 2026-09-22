import React from 'react';

/**
 * Skeleton loading state for Project Section in Slider Mode
 */
export const ProjectSliderSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-[36px] sm:rounded-[48px] border-2 border-white/10 bg-[#0E0E0E] p-5 sm:p-7 md:p-9 shadow-2xl relative select-none flex flex-col justify-between overflow-hidden animate-shimmer">
      {/* Top Row: Number, Category, Title & Action Skeletons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Number skeleton */}
          <div className="w-16 sm:w-24 h-12 sm:h-16 rounded-2xl bg-white/[0.06] animate-pulse" />
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-24 h-4 rounded-full bg-[#B600A8]/20 animate-pulse" />
              <div className="w-28 h-4 rounded-full bg-white/[0.05] hidden sm:block animate-pulse" />
            </div>
            <div className="w-48 sm:w-72 md:w-80 h-7 sm:h-9 rounded-xl bg-white/[0.08] animate-pulse" />
          </div>
        </div>

        {/* Action Button Skeletons */}
        <div className="flex items-center gap-2.5">
          <div className="w-28 h-9 rounded-full bg-white/[0.05] animate-pulse hidden sm:block" />
          <div className="w-32 h-10 rounded-full bg-white/[0.08] animate-pulse" />
        </div>
      </div>

      {/* Tagline / Description Skeletons */}
      <div className="space-y-2 mb-6 max-w-3xl">
        <div className="w-full h-4 rounded-md bg-white/[0.05] animate-pulse" />
        <div className="w-4/5 h-4 rounded-md bg-white/[0.05] animate-pulse" />
        <div className="w-2/3 h-4 rounded-md bg-white/[0.04] animate-pulse" />
      </div>

      {/* Tech Stacks Skeletons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-20 sm:w-24 h-7 rounded-full bg-white/[0.05] border border-white/[0.04] animate-pulse"
          />
        ))}
      </div>

      {/* 2-Column Visual Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch mb-6">
        {/* Left Column (5 cols) - 2 stacked images */}
        <div className="md:col-span-5 flex flex-col gap-4 justify-between">
          <div
            className="w-full rounded-[24px] sm:rounded-[32px] bg-white/[0.05] border border-white/[0.04] overflow-hidden animate-shimmer relative"
            style={{ height: 'clamp(140px, 16vw, 210px)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-white/[0.06]" />
          </div>
          <div
            className="w-full rounded-[24px] sm:rounded-[32px] bg-white/[0.05] border border-white/[0.04] overflow-hidden animate-shimmer relative"
            style={{ height: 'clamp(160px, 20vw, 280px)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-white/[0.06]" />
          </div>
        </div>

        {/* Right Column (7 cols) - 1 tall showcase image */}
        <div className="md:col-span-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.06] border border-white/[0.04] overflow-hidden min-h-[260px] md:min-h-full animate-shimmer relative flex flex-col justify-end p-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-white/[0.08]" />
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="w-36 h-4 rounded bg-white/10 animate-pulse" />
            <div className="w-28 h-4 rounded bg-emerald-500/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
        <div className="w-56 h-4 rounded-md bg-white/[0.05] animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="w-14 h-4 rounded-md bg-white/[0.06] animate-pulse" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2.5 h-2.5 rounded-full bg-white/[0.08] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loading state for Project Section in Stacked Grid Mode
 */
export const ProjectStackSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="p-6 sm:p-8 rounded-[36px] bg-[#141414] border border-[#242424] flex flex-col justify-between shadow-xl animate-shimmer relative overflow-hidden"
        >
          <div>
            {/* Top Row: Number & Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-8 rounded-lg bg-white/[0.07] animate-pulse" />
              <div className="w-24 h-6 rounded-full bg-white/[0.05] border border-white/[0.05] animate-pulse" />
            </div>

            {/* Featured Image Skeleton Box */}
            <div className="w-full h-56 rounded-[24px] bg-white/[0.05] border border-white/[0.04] mb-5 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-white/[0.06]" />
            </div>

            {/* Title Skeleton */}
            <div className="w-3/4 h-6 rounded-lg bg-white/[0.08] mb-3 animate-pulse" />

            {/* Description Skeletons */}
            <div className="space-y-2 mb-4">
              <div className="w-full h-3.5 rounded bg-white/[0.05] animate-pulse" />
              <div className="w-5/6 h-3.5 rounded bg-white/[0.05] animate-pulse" />
              <div className="w-2/3 h-3.5 rounded bg-white/[0.04] animate-pulse" />
            </div>
          </div>

          <div>
            {/* Technologies Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[1, 2, 3].map((t) => (
                <div
                  key={t}
                  className="w-16 h-5 rounded-md bg-white/[0.05] animate-pulse"
                />
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-[#242424] flex items-center justify-between">
              <div className="w-32 h-4 rounded bg-[#B600A8]/20 animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-white/[0.06] animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
