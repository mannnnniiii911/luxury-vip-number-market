'use client';

import React from 'react';
import { openConciergeWhatsApp } from '@/lib/whatsapp';

interface SiteFooterProps {
  onShowInfo: (title: string, content: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onShowInfo }) => {
  return (
    <footer className="px-5 pt-3 pb-6 border-t border-[#E5DAC6] text-[11px] text-[#6E6252] bg-[#F7F3EB]" data-purpose="site-footer">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-[#C49226]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
          </svg>
        </div>
        <span className="font-luxury-title text-[13px] font-bold text-[#2A231C]">
          Luxury VIP Number Market
        </span>
      </div>
      <p className="text-[10.5px] leading-relaxed text-[#7A6F62] mb-3">
        India&apos;s recognized sovereign exchange for rare digital assets, vanity SIMs, and astrological royal mobile numbers. All brand names belong to their respective telecom authorities.
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-semibold text-[#54483B] mb-4">
        <a
          className="hover:text-[#B87910] cursor-pointer"
          onClick={() =>
            onShowInfo(
              'About Us',
              "Luxury VIP Number Market is India's supreme authority in rare high-status telecom vanity assets, serving Fortune 500 executives, royal families, and high-net-worth individuals across 22 telecom circles."
            )
          }
        >
          About Us
        </a>
        <a
          className="hover:text-[#B87910] cursor-pointer"
          onClick={() =>
            onShowInfo(
              'MNP FAQs',
              'MNP (Mobile Number Portability) allows you to transfer your purchased VIP number into your personal name on any network (Jio, Airtel, Vi) within 15 minutes to 24 hours. Full guidance provided by your dedicated concierge.'
            )
          }
        >
          MNP FAQs
        </a>
        <a
          className="hover:text-[#B87910] cursor-pointer"
          onClick={() =>
            onShowInfo(
              'Terms of Escrow',
              'All transactions are backed by TRAI verified legal transfer contracts. Payments are locked in 100% audited institutional escrow until the SIM card is activated in your possession.'
            )
          }
        >
          Terms of Escrow
        </a>
        <a
          className="hover:text-[#B87910] cursor-pointer"
          onClick={() =>
            onShowInfo(
              'Privacy & Security',
              'Your identity and purchase records are safeguarded with private NDA protocol. We never disclose ownership records of high-tier royal numbers without explicit client consent.'
            )
          }
        >
          Privacy &amp; Security
        </a>
        <a className="hover:text-[#B87910] cursor-pointer" onClick={openConciergeWhatsApp}>
          Concierge Desk
        </a>
      </div>
      <div className="text-[9.5px] text-[#93887B] border-t border-[#E8DEC9] pt-2.5 flex items-center justify-between">
        <span>© 2024-2026 Luxury VIP Market Ltd.</span>
        <span className="flex items-center gap-1 text-[#867868]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> 256-bit SSL Encrypted
        </span>
      </div>
    </footer>
  );
};
