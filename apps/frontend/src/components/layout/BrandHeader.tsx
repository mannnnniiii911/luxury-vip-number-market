'use client';

import React from 'react';

interface BrandHeaderProps {
  onReset: () => void;
  onOpenMenu: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ onReset, onOpenMenu }) => {
  return (
    <section
      className="px-5 pt-2 pb-3.5 flex items-center justify-between sticky top-0 z-40 bg-[#F6F3EC]/95 backdrop-blur-sm border-b border-[#E8DFC8]/60"
      data-purpose="brand-header"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
        <div className="text-[#C49226] flex items-center justify-center">
          <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
          </svg>
        </div>
        <div className="leading-tight">
          <h1 className="font-luxury-title text-[20px] font-bold text-[#2A231C] tracking-wide">
            Luxury VIP
          </h1>
          <p className="text-[10px] tracking-wider font-semibold text-[#8C7D6B] uppercase font-cinzel">
            Number Market
          </p>
        </div>
      </div>
      <button
        onClick={onOpenMenu}
        aria-label="Toggle menu"
        className="w-10 h-10 rounded-xl bg-[#FCFAF6] border border-[#E7DFCF] text-[#4A4033] flex items-center justify-center shadow-xs active:scale-95 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};
