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
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={onReset}>
        {/* Geometric V logo — matching uploaded brand image */}
        <svg className="w-11 h-11 flex-shrink-0" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left upper diamond */}
          <polygon points="4,2 18,2 22,14 8,14" fill="#C49226"/>
          {/* Right upper diamond */}
          <polygon points="30,2 44,2 40,14 26,14" fill="#D4A82A"/>
          {/* Center top connector */}
          <polygon points="20,2 28,2 26,10 22,10" fill="#B87910"/>
          {/* Left lower arm */}
          <polygon points="8,16 22,16 20,30 10,42" fill="#C49226"/>
          {/* Right lower arm */}
          <polygon points="26,16 40,16 38,42 28,30" fill="#D4A82A"/>
          {/* Center V point */}
          <polygon points="20,30 28,30 24,46" fill="#E8C040"/>
        </svg>

        <div className="leading-none">
          <h1 className="text-[22px] font-black text-[#2A231C] tracking-[0.08em] uppercase" style={{fontFamily:'inherit'}}>
            VIP
          </h1>
          <p className="text-[9px] tracking-[0.18em] font-bold text-[#B87910] uppercase font-cinzel mt-0.5">
            Number Shop
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
