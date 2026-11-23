'use client';

import React from 'react';

interface BottomNavProps {
  activeTab: string;
  wishlistCount: number;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, wishlistCount, onTabChange }) => {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 w-full max-w-[420px] glass-nav border-t border-[#E8DEC9] px-6 py-2.5 flex justify-between items-center z-50 shadow-nav-bar transition-all duration-300"
      data-purpose="bottom-nav"
    >
      <button
        id="tab-home"
        onClick={() => onTabChange('home')}
        className={`tab-item flex flex-col items-center gap-1 transition py-1 px-3 ${
          activeTab === 'home' || activeTab === 'catalog' ? 'text-[#B87910]' : 'text-[#736B63]'
        }`}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="text-[10.5px] font-bold tracking-tight">Home</span>
      </button>

      <button
        id="tab-vip"
        onClick={() => onTabChange('vip')}
        className={`tab-item flex flex-col items-center gap-1 transition py-1 px-2 ${
          activeTab === 'vip' ? 'text-[#B87910]' : 'text-[#736B63]'
        } hover:text-[#B87910]`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 9h20M12 21l4-12M12 21l-4-12M10 3l-2 6M14 3l2 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10.5px] font-semibold tracking-tight">VIP Numbers</span>
      </button>

      <button
        id="tab-support"
        onClick={() => onTabChange('support')}
        className={`tab-item flex flex-col items-center gap-1 transition py-1 px-2 ${
          activeTab === 'support' ? 'text-[#B87910]' : 'text-[#736B63]'
        } hover:text-[#B87910]`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18.364 5.636a9 9 0 010 12.728M4 14v4a2 2 0 002 2h2m-4-6a9 9 0 0115.364-6.364M4 14H3a1 1 0 01-1-1v-2a1 1 0 011-1h1m16 4h1a1 1 0 001-1v-2a1 1 0 00-1-1h-1m0 4v4a2 2 0 01-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10.5px] font-semibold tracking-tight">Support</span>
      </button>

      <button
        id="tab-account"
        onClick={() => onTabChange('account')}
        className={`tab-item flex flex-col items-center gap-1 relative transition py-1 px-2 ${
          activeTab === 'account' || activeTab === 'wishlist' ? 'text-[#B87910]' : 'text-[#736B63]'
        } hover:text-[#B87910]`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10.5px] font-semibold tracking-tight">
          Saved ({wishlistCount})
        </span>
        {wishlistCount > 0 && (
          <span className="w-2 h-2 rounded-full bg-[#B87910] absolute -top-0.5 right-2" />
        )}
      </button>
    </nav>
  );
};
