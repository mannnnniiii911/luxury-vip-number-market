'use client';

import React from 'react';

export const TrustGuarantees: React.FC = () => {
  return (
    <section className="px-5 pt-4 pb-2" data-purpose="trust-guarantees">
      <div className="text-center mb-3">
        <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#93661A]">Trust &amp; Heritage</span>
        <h3 className="font-luxury-title text-[17px] font-bold text-[#231C14]">Why Choose Luxury VIP</h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#FCFAF6] border border-[#E8DFC9] rounded-xl">
          <div className="text-[#B87910] mb-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-[11px] font-bold text-[#251E16]">100% Pan-India Porting</h4>
          <p className="text-[9.5px] text-[#756A5B] mt-0.5">Seamless MNP transfer to Jio, Airtel, or Vi in all 22 circles.</p>
        </div>

        <div className="p-3 bg-[#FCFAF6] border border-[#E8DFC9] rounded-xl">
          <div className="text-[#B87910] mb-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-[11px] font-bold text-[#251E16]">Escrow Protected</h4>
          <p className="text-[9.5px] text-[#756A5B] mt-0.5">Your money is safe until SIM is ported and working in your hand.</p>
        </div>

        <div className="p-3 bg-[#FCFAF6] border border-[#E8DFC9] rounded-xl">
          <div className="text-[#B87910] mb-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-[11px] font-bold text-[#251E16]">15-Min Instant UPC</h4>
          <p className="text-[9.5px] text-[#756A5B] mt-0.5">Fastest automated dispatch of official TRAI porting codes.</p>
        </div>

        <div className="p-3 bg-[#FCFAF6] border border-[#E8DFC9] rounded-xl">
          <div className="text-[#B87910] mb-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-[11px] font-bold text-[#251E16]">Verified Ownership</h4>
          <p className="text-[9.5px] text-[#756A5B] mt-0.5">Full invoice, legal transfer agreement &amp; billing in your name.</p>
        </div>
      </div>
    </section>
  );
};
