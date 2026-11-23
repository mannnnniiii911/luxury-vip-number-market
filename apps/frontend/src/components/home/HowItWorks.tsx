'use client';

import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="px-5 pt-4 pb-2" data-purpose="how-it-works">
      <div className="rounded-2xl border border-[#DECDB0] p-4 bg-[#F8F3EA] shadow-card-soft">
        <div className="text-center mb-4">
          <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#93661A]">
            Effortless Ownership
          </span>
          <h3 className="font-luxury-title text-[17px] font-bold text-[#231C14]">
            How It Works In 3 Steps
          </h3>
        </div>
        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#B87910] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-[#241D15]">Select Your VIP Number</h4>
              <p className="text-[11px] text-[#6E6457] leading-snug">
                Browse verified inventory, reserve instantly or consult our VIP concierge.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#B87910] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-[#241D15]">Secure Escrow Payment</h4>
              <p className="text-[11px] text-[#6E6457] leading-snug">
                Funds held safely in audited escrow until transfer confirmation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#B87910] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-[#241D15]">Instant UPC &amp; MNP Porting</h4>
              <p className="text-[11px] text-[#6E6457] leading-snug">
                Receive official Unique Porting Code within 15 mins to activate on Airtel/Jio/Vi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
