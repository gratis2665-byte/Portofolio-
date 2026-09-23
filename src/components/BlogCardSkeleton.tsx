import React from 'react';

/**
 * Skeleton loading state for Blog Section cards
 */
export const BlogCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between p-6 sm:p-7 rounded-[28px] bg-white border border-[#E2E8F0] shadow-md relative overflow-hidden"
        >
          <div>
            {/* Meta header skeleton */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-24 h-5 rounded-full bg-sky-100 animate-pulse border border-sky-200" />
              <div className="flex items-center gap-2">
                <div className="w-20 h-3.5 rounded bg-slate-200 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <div className="w-14 h-3.5 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>

            {/* Title Skeleton (2 lines) */}
            <div className="space-y-2 mb-4">
              <div className="w-5/6 h-5 sm:h-6 rounded-lg bg-slate-200 animate-pulse" />
              <div className="w-3/5 h-5 sm:h-6 rounded-lg bg-slate-100 animate-pulse" />
            </div>

            {/* Excerpt Skeleton (3 lines) */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-3.5 rounded bg-slate-200 animate-pulse" />
              <div className="w-11/12 h-3.5 rounded bg-slate-200 animate-pulse" />
              <div className="w-4/5 h-3.5 rounded bg-slate-100 animate-pulse" />
            </div>
          </div>

          {/* Footer and Read CTA skeleton */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-14 h-4 rounded bg-slate-200 animate-pulse" />
              <div className="w-16 h-4 rounded bg-slate-200 animate-pulse" />
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-20 h-3.5 rounded bg-sky-200 animate-pulse" />
              <div className="w-3.5 h-3.5 rounded-full bg-sky-200 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
