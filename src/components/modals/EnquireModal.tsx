'use client';

import React, { useState, useEffect } from 'react';
import { VipNumber } from '@luxury-vip/shared-types';
import { openEnquireWhatsApp } from '@/lib/whatsapp';

interface EnquireModalProps {
  item: VipNumber | null;
  onClose: () => void;
  onSubmitSuccess?: (msg: string) => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({
  item,
  onClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [circle, setCircle] = useState('');

  useEffect(() => {
    if (item) {
      setName('');
      setPhone('');
      setCircle('');
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSuccess) {
      onSubmitSuccess(`Enquiry sent for ${item.number}!`);
    }
    // Direct WhatsApp redirection
    openEnquireWhatsApp(item.number, item.badge || item.title, item.price);
    onClose();
  };

  return (
    <div id="enquire-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#FCFAF6] rounded-2xl max-w-sm w-full p-5 border border-[#E7D6B0] shadow-modal z-10">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADDC2]">
          <div>
            <span className="text-[9px] font-bold text-[#A66E13] uppercase tracking-wider">
              Direct Acquisition Desk
            </span>
            <h3 id="enquire-number-title" className="font-luxury-title font-bold text-lg text-[#231C14]">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#EFE8DA] flex items-center justify-center text-[#4A4033] hover:bg-[#E2D8C5]"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="py-4 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#55493C] block mb-1">
              Target Number
            </label>
            <input
              id="enquire-number-input"
              value={item.number}
              readOnly
              className="w-full bg-[#EFEBE3] border border-[#D9CCB4] rounded-xl px-3 py-2 text-xs font-bold text-[#2A231C] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#55493C] block mb-1">
              Your Full Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Sharma"
              className="w-full bg-white border border-[#D9CCB4] rounded-xl px-3 py-2 text-xs text-[#2A231C] focus:ring-1 focus:ring-[#B87910] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#55493C] block mb-1">
              Your WhatsApp / Mobile
            </label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98XXX XXXXX"
              className="w-full bg-white border border-[#D9CCB4] rounded-xl px-3 py-2 text-xs text-[#2A231C] focus:ring-1 focus:ring-[#B87910] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#55493C] block mb-1">
              Offer / Preferred Porting Circle
            </label>
            <textarea
              rows={2}
              value={circle}
              onChange={(e) => setCircle(e.target.value)}
              placeholder="e.g. Delhi NCR / Looking to activate tomorrow"
              className="w-full bg-white border border-[#D9CCB4] rounded-xl px-3 py-2 text-xs text-[#2A231C] focus:ring-1 focus:ring-[#B87910] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#2A231C] hover:bg-[#3D3328] text-[#F9F5EC] font-bold text-xs shadow-xs transition"
          >
            Send Enquiry to Senior Concierge
          </button>
        </form>
      </div>
    </div>
  );
};
