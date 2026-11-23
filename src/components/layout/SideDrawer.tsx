'use client';

import React from 'react';
import { openConciergeWhatsApp } from '@/lib/whatsapp';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onResetCatalog: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenWishlist: () => void;
  onShowInfo: (title: string, content: string) => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onResetCatalog,
  onSelectCategory,
  onOpenWishlist,
  onShowInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div id="side-drawer" className="fixed inset-0 z-[100]">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-[310px] bg-[#FCFAF6] shadow-2xl p-6 flex flex-col justify-between border-l border-[#E5DAC6] transform transition-transform duration-300">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC9]">
            <div className="flex items-center gap-2">
              <div className="text-[#C49226]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
                </svg>
              </div>
              <span className="font-luxury-title font-bold text-base text-[#251E16]">
                Luxury VIP Menu
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#EFE8DA] flex items-center justify-center text-[#4A4033] hover:bg-[#E2D8C5]"
            >
              ✕
            </button>
          </div>
          <div className="py-4 space-y-1 text-sm font-semibold text-[#3D3328]">
            <a
              onClick={() => {
                onClose();
                onResetCatalog();
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              👑 Featured Royal Inventory (1,098)
            </a>
            <a
              onClick={() => {
                onClose();
                onSelectCategory('All');
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              🔮 Numerology & 786 Specials (37)
            </a>
            <a
              onClick={() => {
                onClose();
                onSelectCategory('AAAAA');
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              💎 Penta & Hexa Numbers (18)
            </a>
            <a
              onClick={() => {
                onClose();
                onSelectCategory('AA BB');
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              🔀 Doubling (AABBCC) Patterns (20)
            </a>
            <a
              onClick={() => {
                onClose();
                onSelectCategory('VIP Numbers');
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              🍸 0007 James Bond Series
            </a>
            <a
              onClick={() => {
                onClose();
                onSelectCategory('AB BA');
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              🪞 Mirror & Symmetry Numbers
            </a>
            <a
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              ❤️ My Saved Wishlist
            </a>
            <a
              onClick={() => {
                onClose();
                onShowInfo(
                  'Escrow Guarantee',
                  '100% Escrow Protected: Payments are securely reserved until the VIP SIM is ported and confirmed active in your circle.'
                );
              }}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#F3EDE2] cursor-pointer"
            >
              🛡️ Escrow Guarantee
            </a>
          </div>
        </div>
        <div className="pt-4 border-t border-[#E8DFC9]">
          <button
            onClick={() => {
              onClose();
              openConciergeWhatsApp();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#B87910] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#a1680a] transition"
          >
            <span>Direct VIP Concierge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
