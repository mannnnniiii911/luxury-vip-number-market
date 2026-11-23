'use client';

import React, { useState } from 'react';
import { VipNumber } from '@luxury-vip/shared-types';
import { formatINR } from '@/lib/utils';
import { openEscrowBuyWhatsApp } from '@/lib/whatsapp';

interface BuyModalProps {
  item: VipNumber | null;
  onClose: () => void;
  onSuccess: (item: VipNumber, carrier: string) => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({ item, onClose, onSuccess }) => {
  const [carrier, setCarrier] = useState('Jio');

  if (!item) return null;

  const handleConfirm = () => {
    onSuccess(item, carrier);
    setTimeout(() => {
      openEscrowBuyWhatsApp(item.title, item.number, carrier, item.price);
    }, 700);
    onClose();
  };

  return (
    <div id="buy-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#FCFAF6] rounded-2xl max-w-sm w-full p-5 border border-[#E7D6B0] shadow-modal z-10">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADDC2]">
          <div>
            <span className="text-[9px] font-bold text-[#A66E13] uppercase tracking-wider">
              Reserve &amp; Port
            </span>
            <h3 id="modal-number-title" className="font-luxury-title font-bold text-lg text-[#231C14]">
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

        <div className="py-4 space-y-3">
          <div className="bg-[#FCF5E3] border border-[#F2E0AC] rounded-xl p-3 text-center">
            <span id="modal-number-display" className="text-xl font-extrabold text-[#1D1812] tracking-wide block">
              {item.number}
            </span>
            <div className="text-xs text-[#6E6354] mt-1">
              Price:{' '}
              <strong id="modal-number-price" className="text-[#96671A] text-sm">
                {formatINR(item.price)}
              </strong>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#55493C] block mb-1">
              Select Target Operator
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Jio', 'Airtel', 'Vi'] as const).map((c) => (
                <label
                  key={c}
                  className={`border rounded-xl p-2 text-center text-xs font-semibold cursor-pointer transition ${
                    carrier === c
                      ? 'border-[#B87910] bg-[#FAF3E4]'
                      : 'border-[#D9CCB4]'
                  }`}
                >
                  <input
                    type="radio"
                    name="carrier"
                    value={c}
                    checked={carrier === c}
                    onChange={() => setCarrier(c)}
                    className="hidden"
                  />
                  {c === 'Jio' ? 'Jio 5G' : c === 'Airtel' ? 'Airtel' : 'Vodafone'}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#F5EFE4] p-2.5 rounded-xl text-[10.5px] text-[#5A4F42] space-y-1">
            <div className="flex justify-between">
              <span>Escrow Fee:</span>
              <span className="font-bold text-emerald-700">FREE (Covered)</span>
            </div>
            <div className="flex justify-between">
              <span>UPC Code Delivery:</span>
              <span className="font-bold">Instant (&lt; 15 Mins)</span>
            </div>
            <div className="flex justify-between">
              <span>Pan-India Circle Port:</span>
              <span className="font-bold">100% Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={handleConfirm}
            className="w-full py-2.5 rounded-xl bg-[#B87910] hover:bg-[#9F650A] text-white font-bold text-xs shadow-xs transition"
          >
            Proceed with Escrow Transfer
          </button>
        </div>
      </div>
    </div>
  );
};
