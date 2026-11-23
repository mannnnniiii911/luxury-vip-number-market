'use client';

import React from 'react';
import { openConciergeWhatsApp } from '@/lib/whatsapp';

export const ConciergeCTA: React.FC = () => {
  return (
    <section className="px-5 pt-1 pb-4" data-purpose="concierge-cta">
      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#241D16] to-[#382E23] text-white flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[9px] font-bold text-[#E5B558] tracking-widest uppercase">
            Private Sourcing
          </span>
          <h4 className="font-luxury-title text-[15px] font-bold">Need a Custom Digit?</h4>
          <p className="text-[10px] text-[#B8ABA0]">Connect directly with our senior acquisition director</p>
        </div>
        <button
          onClick={openConciergeWhatsApp}
          className="px-3.5 py-2 rounded-xl bg-[#B87910] hover:bg-[#a1680a] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 transition shadow-gold-glow"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.85 11.85 0 0012.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.97L0 24l6.23-1.63a11.9 11.9 0 005.83 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.88h-.01c-1.8 0-3.57-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.7-.24-.38a9.92 9.92 0 01-1.52-5.21c0-5.49 4.47-9.96 9.97-9.96 2.66 0 5.16 1.04 7.04 2.92a9.88 9.88 0 012.92 7.04c0 5.5-4.47 9.96-9.96 9.96zm5.46-7.46c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35z" />
          </svg>
          <span>WhatsApp VIP</span>
        </button>
      </div>
    </section>
  );
};
