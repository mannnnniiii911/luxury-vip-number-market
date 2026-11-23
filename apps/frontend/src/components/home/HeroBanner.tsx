'use client';

import React, { useState } from 'react';

interface HeroBannerProps {
  searchQuery: string;
  onSearch: (val: string) => void;
  onOpenFilter: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ searchQuery, onSearch, onOpenFilter }) => {
  const [localVal, setLocalVal] = useState(searchQuery);

  const handleSubmit = () => {
    onSearch(localVal);
  };

  return (
    <section className="px-5 pt-3 pb-3" data-purpose="hero-banner">
      <div className="rounded-2xl p-4 relative overflow-hidden bg-gradient-to-br from-[#FBF7EE] to-[#F2E8D4] border border-[#E8DFC9] shadow-card-soft">
        <div className="relative z-10 space-y-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE4CF] text-[#8C5D17] text-[10px] font-extrabold tracking-wider uppercase border border-[#E0D2B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87910]" />
            Direct Carrier Porting • Pan India
          </span>
          <h2 className="font-luxury-title text-[22px] font-bold text-[#1D1812] leading-tight">
            Claim Your Signature Identity
          </h2>
          <p className="text-xs text-[#6B6053] leading-relaxed">
            India&apos;s premier marketplace for rare, auspicious &amp; royal VIP mobile numbers. Instant transfer with 100% legal ownership.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <svg className="w-4 h-4 text-[#8C7D6B] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                id="search-input"
                value={localVal}
                onChange={(e) => {
                  setLocalVal(e.target.value);
                  onSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                className="w-full bg-[#FFFFFF] border border-[#D9CCB4] rounded-xl pl-9 pr-3 py-2.5 text-[12px] text-[#251E16] placeholder-[#9C8F80] focus:ring-1 focus:ring-[#B87910] focus:border-[#B87910] shadow-sm transition outline-none"
                placeholder="Search 7777, 0007, or sum total..."
                type="text"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSubmit}
              aria-label="Search"
              className="h-10 px-3 rounded-xl bg-[#B87910] hover:bg-[#A3690B] text-[#FFFFFF] flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 transition text-[11px] font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Filter Button */}
            <button
              onClick={onOpenFilter}
              aria-label="Advanced filters"
              className="w-10 h-10 rounded-xl bg-[#2A231C] text-[#F9F5EC] flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition hover:bg-[#3D3328]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
