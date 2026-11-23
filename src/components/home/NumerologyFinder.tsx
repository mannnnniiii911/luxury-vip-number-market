'use client';

import React from 'react';

interface NumerologyFinderProps {
  birthDay: number;
  targetSum: string;
  matchCount: number;
  onChangeBirthDay: (val: number) => void;
  onChangeTargetSum: (val: string) => void;
  onApply: () => void;
}

export const NumerologyFinder: React.FC<NumerologyFinderProps> = ({
  birthDay,
  targetSum,
  matchCount,
  onChangeBirthDay,
  onChangeTargetSum,
  onApply,
}) => {
  return (
    <section className="px-5 py-2.5" data-purpose="numerology-finder">
      <div className="bg-[#FCFAF6] border border-[#EADBBD] rounded-2xl p-3.5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#F3EDE2] text-[#B87910] flex items-center justify-center font-bold text-xs">
              ✦
            </span>
            <div>
              <h3 className="font-luxury-title text-[13px] font-bold text-[#2A231C]">
                Numerology &amp; Lucky Digit Finder
              </h3>
              <p className="text-[10px] text-[#857766]">
                Match numbers to your date of birth or life path
              </p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#A66E13] bg-[#F7EED9] px-2 py-0.5 rounded-md border border-[#E8D4A8]">
            Auspicious
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] font-bold text-[#635544] block mb-1 uppercase tracking-wider">
              Birth Day
            </label>
            <select
              value={birthDay}
              onChange={(e) => onChangeBirthDay(Number(e.target.value))}
              className="w-full bg-[#FFFFFF] border border-[#D9CCB4] rounded-xl px-2.5 py-1.5 text-xs text-[#2A231C] font-semibold focus:ring-1 focus:ring-[#B87910] outline-none"
            >
              <option value="1">1 (Sun)</option>
              <option value="2">2 (Moon)</option>
              <option value="3">3 (Jupiter)</option>
              <option value="4">4 (Rahu)</option>
              <option value="5">5 (Mercury)</option>
              <option value="6">6 (Venus)</option>
              <option value="7">7 (Ketu)</option>
              <option value="8">8 (Saturn)</option>
              <option value="9">9 (Mars)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#635544] block mb-1 uppercase tracking-wider">
              Target Sum
            </label>
            <select
              value={targetSum}
              onChange={(e) => onChangeTargetSum(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9CCB4] rounded-xl px-2.5 py-1.5 text-xs text-[#2A231C] font-semibold focus:ring-1 focus:ring-[#B87910] outline-none"
            >
              <option value="any">Any Auspicious</option>
              <option value="1">Total 1 (Leadership)</option>
              <option value="5">Total 5 (Business &amp; Wealth)</option>
              <option value="6">Total 6 (Luxury &amp; Venus)</option>
              <option value="7">Total 7 (Wisdom &amp; Ketu)</option>
              <option value="8">Total 8 (Power &amp; Saturn)</option>
              <option value="9">Total 9 (Victory &amp; Mars)</option>
              <option value="37">Master 37 (High Shubh)</option>
              <option value="46">Royal 46 (Crown Status)</option>
              <option value="55">Power 55 (Rapid Fortune)</option>
            </select>
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full py-2 px-3 rounded-xl bg-[#B87910] hover:bg-[#A3690B] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition"
        >
          <span>Find Matches</span>
          <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-normal">
            {matchCount} Ready
          </span>
        </button>
      </div>
    </section>
  );
};
