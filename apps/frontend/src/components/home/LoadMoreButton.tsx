'use client';

import React from 'react';

interface LoadMoreButtonProps {
  loaded: number;
  total: number;
  onLoadMore: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  loaded,
  total,
  onLoadMore,
}) => {
  const remaining = Math.max(0, total - loaded);
  if (remaining <= 0) return null;

  return (
    <div id="load-more-btn" className="px-5 py-4 text-center space-y-1.5">
      <button
        onClick={onLoadMore}
        className="px-6 py-2.5 rounded-xl bg-[#B87910] hover:bg-[#A3690B] text-white text-[12px] font-bold shadow-sm active:scale-95 transition"
      >
        Load More ({remaining} remaining)
      </button>
      <p className="text-[10px] text-[#9A8E80]">
        {loaded} of {total} numbers shown
      </p>
    </div>
  );
};
