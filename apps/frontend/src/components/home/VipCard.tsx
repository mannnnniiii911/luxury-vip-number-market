'use client';

import React from 'react';
import { VipNumber } from '@luxury-vip/shared-types';
import { formatINR } from '@/lib/utils';

interface VipCardProps {
  item: VipNumber;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onEnquire: (item: VipNumber) => void;
  onBuy: (item: VipNumber) => void;
}

export const VipCard: React.FC<VipCardProps> = ({
  item,
  isWishlisted,
  onToggleWishlist,
  onEnquire,
  onBuy,
}) => {
  const discountHtml = (item.discount || '').replace(' ', '<br/>');

  return (
    <div
      data-purpose="vip-card"
      className="bg-[#FCFAF6] border border-[#EADBBD] rounded-2xl p-3 flex flex-col justify-between shadow-card-soft hover:shadow-md transition relative group"
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-wider text-[#8A7865] uppercase bg-[#F3EDE2] px-2 py-0.5 rounded-md border border-[#E6D9C3] leading-tight text-center">
            PAN-INDIA
            <br />
            VALIDITY
          </span>
          <span
            className="text-[9px] font-black text-[#A66E13] bg-[#FCF3DB] px-1.5 py-0.5 rounded-md border border-[#F0DFB5] leading-tight text-right uppercase"
            dangerouslySetInnerHTML={{ __html: discountHtml }}
          />
        </div>

        <div className="text-center pt-1 pb-0.5">
          <span className="text-[10px] font-bold text-[#A66E13] tracking-widest uppercase block">
            ★ {item.badge || item.title} ★
          </span>
          <span className="font-luxury-title text-[19px] font-extrabold text-[#1D1812] tracking-wider block py-0.5">
            {item.number}
          </span>
          <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-[#736655] font-medium">
            <span>Sum Total: {item.sum}</span>
            <span>•</span>
            <span>
              Status: <strong className="text-emerald-700">{item.status}</strong>
            </span>
            {item.planet && <span>({item.planet})</span>}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EFE6D5] mt-1 space-y-1.5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[9px] font-bold text-[#8C7D6B] uppercase tracking-wider block">
              ACQUISITION PRICE
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-luxury-title text-[15px] font-black text-[#1D1812]">
                {formatINR(item.price)}
              </span>
              {item.originalPrice && item.originalPrice !== item.price && (
                <span className="text-[10px] text-[#9A8E80] line-through">
                  {formatINR(item.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onToggleWishlist(item.id)}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-1 transition active:scale-125 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#8F8477] hover:text-red-500'
            }`}
          >
            <svg
              className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={() => onEnquire(item)}
            className="py-1.5 px-1 rounded-lg border border-[#D1C6B4] bg-[#F2EDE3] hover:bg-[#E8DFC9] text-[11px] font-bold text-[#3B3227] active:scale-95 transition"
          >
            Enquire
          </button>
          <button
            onClick={() => onBuy(item)}
            className="py-1.5 px-1 rounded-lg bg-[#B87910] hover:bg-[#A3690B] text-white text-[11px] font-bold shadow-xs active:scale-95 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
