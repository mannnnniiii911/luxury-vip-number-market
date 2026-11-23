'use client';

import React from 'react';
import { VipNumber } from '@luxury-vip/shared-types';
import { VipCard } from './VipCard';

interface NumbersGridProps {
  items: VipNumber[];
  totalCount: number;
  category: string;
  wishlist: Set<number>;
  onToggleWishlist: (id: number) => void;
  onEnquire: (item: VipNumber) => void;
  onBuy: (item: VipNumber) => void;
  onReset: () => void;
}

export const NumbersGrid: React.FC<NumbersGridProps> = ({
  items,
  totalCount,
  category,
  wishlist,
  onToggleWishlist,
  onEnquire,
  onBuy,
  onReset,
}) => {
  const headingText =
    category === 'All'
      ? 'Complete VIP Collection'
      : category.endsWith('Numbers') || category.endsWith('Series')
      ? `${category} Collection`
      : `${category} Numbers`;

  return (
    <main className="px-5 py-2 space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 id="catalog-heading" className="font-luxury-title text-[16px] font-bold text-[#1D1812]">
              {headingText}
            </h3>
            <span
              id="total-count-badge"
              className="px-2 py-0.5 rounded-full bg-[#EADDC2] text-[#554737] text-[10px] font-bold"
            >
              {totalCount}
            </span>
          </div>
          <p className="text-[10px] text-[#8C7D6B]">Certified high-status mobile numbers</p>
        </div>
        <span onClick={onReset} className="text-[11px] font-bold text-[#B87910] hover:underline cursor-pointer">
          View All ({totalCount}) &gt;
        </span>
      </div>

      {items.length === 0 ? (
        <div id="empty-state" className="text-center py-12 px-4 bg-[#FCFAF6] rounded-2xl border border-[#EADBBD]">
          <span className="text-3xl block mb-2">🔍</span>
          <h4 className="font-luxury-title text-base font-bold text-[#2A231C]">No Matching VIP Numbers</h4>
          <p className="text-xs text-[#8C7D6B] max-w-xs mx-auto mt-1 mb-4">
            We couldn&apos;t find an exact match for your query. Try searching another pattern or reset your filters.
          </p>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-[#B87910] hover:bg-[#A3690B] text-white text-xs font-bold transition shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div id="numbers-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {items.map((item) => (
            <VipCard
              key={item.id}
              item={item}
              isWishlisted={wishlist.has(item.id)}
              onToggleWishlist={onToggleWishlist}
              onEnquire={onEnquire}
              onBuy={onBuy}
            />
          ))}
        </div>
      )}
    </main>
  );
};
