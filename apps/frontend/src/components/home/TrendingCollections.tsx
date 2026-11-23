'use client';

import React from 'react';

interface TrendingCollectionsProps {
  onSelectCategory: (cat: string) => void;
}

export const TrendingCollections: React.FC<TrendingCollectionsProps> = ({ onSelectCategory }) => {
  return (
    <section className="px-5 pt-5 pb-3" data-purpose="trending-collections">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-luxury-title text-[18px] font-bold text-[#231C14] tracking-tight">
            Curated Collections
          </h2>
          <p className="text-[11px] text-[#786E61]">Iconic patterns designed to stand out</p>
        </div>
        <span className="text-[11px] text-[#916212] font-semibold">Swipe →</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        <div
          onClick={() => onSelectCategory('AAAAA')}
          className="w-[200px] shrink-0 rounded-2xl p-3.5 bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border border-[#E5D7BF] shadow-card-soft cursor-pointer hover:border-[#DDB858] transition"
        >
          <span className="inline-block px-2 py-0.5 rounded text-[8.5px] font-bold tracking-wider uppercase bg-[#EAD8B7] text-[#7C550E] mb-2">
            High Demand
          </span>
          <h3 className="font-luxury-title font-bold text-[14px] text-[#221B13]">
            Billionaire Triplets
          </h3>
          <p className="text-[11px] text-[#706456] mt-0.5 mb-2.5">
            E.g. 000, 777, 999 patterns with prestigious prefixes.
          </p>
          <div className="text-[11px] font-extrabold text-[#B87910]">Starting ₹4,500</div>
        </div>

        <div
          onClick={() => onSelectCategory('AA BB')}
          className="w-[200px] shrink-0 rounded-2xl p-3.5 bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border border-[#E5D7BF] shadow-card-soft cursor-pointer hover:border-[#DDB858] transition"
        >
          <span className="inline-block px-2 py-0.5 rounded text-[8.5px] font-bold tracking-wider uppercase bg-[#EAD8B7] text-[#7C550E] mb-2">
            Harmonic Pairs
          </span>
          <h3 className="font-luxury-title font-bold text-[14px] text-[#221B13]">
            Doubling AABBCC
          </h3>
          <p className="text-[11px] text-[#706456] mt-0.5 mb-2.5">
            Patterns with repeating double digits denoting balance.
          </p>
          <div className="text-[11px] font-extrabold text-[#B87910]">Starting ₹4,500</div>
        </div>

        <div
          onClick={() => onSelectCategory('786 Series')}
          className="w-[200px] shrink-0 rounded-2xl p-3.5 bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border border-[#E5D7BF] shadow-card-soft cursor-pointer hover:border-[#DDB858] transition"
        >
          <span className="inline-block px-2 py-0.5 rounded text-[8.5px] font-bold tracking-wider uppercase bg-[#EAD8B7] text-[#7C550E] mb-2">
            Vedic Power
          </span>
          <h3 className="font-luxury-title font-bold text-[14px] text-[#221B13]">
            Auspicious 786 &amp; Sums
          </h3>
          <p className="text-[11px] text-[#706456] mt-0.5 mb-2.5">
            Astrologically aligned numbers for leadership &amp; success.
          </p>
          <div className="text-[11px] font-extrabold text-[#B87910]">Starting ₹4,500</div>
        </div>
      </div>
    </section>
  );
};
