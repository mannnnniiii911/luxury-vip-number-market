'use client';

import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="toast"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-[#1D1812]/95 text-[#F6F3EC] px-4 py-2.5 rounded-xl shadow-2xl border border-[#D9CCB4]/40 text-xs font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-300 opacity-100 translate-y-0"
    >
      <span className="w-2 h-2 rounded-full bg-[#B87910] animate-pulse" />
      <span>{message}</span>
    </div>
  );
};
