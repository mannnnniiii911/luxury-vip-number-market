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
              <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="4,2 18,2 22,14 8,14" fill="#C49226"/>
                <polygon points="30,2 44,2 40,14 26,14" fill="#D4A82A"/>
                <polygon points="20,2 28,2 26,10 22,10" fill="#B87910"/>
                <polygon points="8,16 22,16 20,30 10,42" fill="#C49226"/>
                <polygon points="26,16 40,16 38,42 28,30" fill="#D4A82A"/>
                <polygon points="20,30 28,30 24,46" fill="#E8C040"/>
              </svg>
              <span className="font-luxury-title font-bold text-base text-[#251E16]">
                VIP Number Shop
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
