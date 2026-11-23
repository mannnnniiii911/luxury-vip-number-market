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
  loading?: boolean;
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
  loading = false,
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

      {/* Skeleton Loading State when items are being fetched */}
      {loading && items.length === 0 ? (
        <div id="numbers-grid-skeleton" className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skel-${i}`}
              className="rounded-2xl p-3.5 bg-gradient-to-br from-[#FAF7F0] to-[#F1E8D7] border border-[#E8DFC9] animate-pulse flex flex-col justify-between h-[178px]"
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-4 bg-[#E4D7C2] rounded-full" />
                <div className="w-6 h-6 bg-[#E4D7C2] rounded-full" />
              </div>
              <div className="space-y-2 my-auto">
                <div className="w-28 h-5 bg-[#DFD0BA] rounded-md" />
                <div className="w-16 h-3 bg-[#E9DCB6] rounded" />
              </div>
              <div className="pt-2 border-t border-[#E8DFC9] flex justify-between items-center gap-2">
                <div className="w-14 h-4 bg-[#E4D7C2] rounded" />
                <div className="w-16 h-6 bg-[#B87910]/25 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
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
        <div
          id="numbers-grid"
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3.5 transition-opacity duration-200 ${
            loading ? 'opacity-70' : 'opacity-100'
          }`}
        >
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
