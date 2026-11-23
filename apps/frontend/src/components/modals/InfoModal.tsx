'use client';

import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div id="info-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#FCFAF6] rounded-2xl max-w-sm w-full p-5 border border-[#E7D6B0] shadow-modal z-10">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADDC2]">
          <h3 id="info-modal-title" className="font-luxury-title font-bold text-lg text-[#231C14]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#EFE8DA] flex items-center justify-center text-[#4A4033] hover:bg-[#E2D8C5]"
          >
            ✕
          </button>
        </div>
        <div
          id="info-modal-body"
          className="py-4 text-xs text-[#524638] leading-relaxed whitespace-pre-line"
        >
          {content}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-[#2A231C] text-[#F9F5EC] text-xs font-bold hover:bg-[#3D3328] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
