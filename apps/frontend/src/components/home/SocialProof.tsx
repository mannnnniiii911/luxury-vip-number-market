'use client';

import React, { useRef, useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  role: string;
  location: string;
  number: string;
  rating: number;
  date: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Rajeshwar Singhania',
    role: 'Managing Partner, Singhania Capital',
    location: 'Mumbai, MH',
    number: '99999 00001',
    rating: 5,
    date: '2 days ago',
    quote: 'Acquired an extraordinary 99999 series number for our family office. The institutional escrow and concierge handover in Mumbai was flawless.',
  },
  {
    id: 2,
    name: 'Dr. Ananya Deshmukh',
    role: 'Hospital Director & Chief Surgeon',
    location: 'Delhi NCR',
    number: '98111 11786',
    rating: 5,
    date: '4 days ago',
    quote: 'Secured an auspicious 786 series number for my private practice. The express UPC porting code arrived within 15 minutes with zero network downtime.',
  },
  {
    id: 3,
    name: 'Vikramaditya Oberoi',
    role: 'Tech Founder & Angel Investor',
    location: 'Bangalore, KA',
    number: '99000 00007',
    rating: 5,
    date: '1 week ago',
    quote: 'The 0007 James Bond series is an absolute conversation starter in every executive meeting. A truly sovereign vanity telecom asset.',
  },
  {
    id: 4,
    name: 'Capt. R. K. Malhotra',
    role: 'Aviation Executive & Investor',
    location: 'Chandigarh, PB',
    number: '98888 88882',
    rating: 5,
    date: '1 week ago',
    quote: 'Unmatched professionalism. Legally verified with TRAI clearance and transferred to my Airtel postpaid connection without any branch visit.',
  },
  {
    id: 5,
    name: 'Meera Singhal',
    role: 'Creative Director & Brand Consultant',
    location: 'Kolkata, WB',
    number: '98300 98300',
    rating: 5,
    date: '2 weeks ago',
    quote: 'Found our brand’s mirror repeating number within minutes. The numerology score matched my life path perfectly. Exceptional concierge experience!',
  },
  {
    id: 6,
    name: 'Zaid Al-Mansoor',
    role: 'Real Estate Developer & Builder',
    location: 'Hyderabad, TS',
    number: '78600 00786',
    rating: 5,
    date: '3 weeks ago',
    quote: 'Genuine 786 series numbers are impossible to find with legal guarantee. The transparent escrow payment gave us 100% peace of mind.',
  },
  {
    id: 7,
    name: 'Harshvardhan Goenka',
    role: 'Industrialist & Textile Exporter',
    location: 'Ahmedabad, GJ',
    number: '99250 99250',
    rating: 5,
    date: '1 month ago',
    quote: 'The direct WhatsApp reservation was instant. The Senior Concierge personally verified the port status and delivered the SIM to our corporate office.',
  },
];

export const SocialProof: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateProgress = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = (scrollLeft / maxScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      const index = Math.round((scrollLeft / maxScroll) * (REVIEWS.length - 1));
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress, { passive: true });
    return () => el.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (index / (REVIEWS.length - 1)) * maxScroll;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const target = Math.max(0, currentIndex - 1);
    scrollToIndex(target);
  };

  const handleNext = () => {
    const target = Math.min(REVIEWS.length - 1, currentIndex + 1);
    scrollToIndex(target);
  };

  return (
    <section className="px-5 pt-3 pb-4" data-purpose="social-proof">
      <div className="bg-[#FCFAF6] border border-[#EADBBD] rounded-2xl p-4 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 border-b border-[#EFE7D7] pb-2.5">
          <div>
            <div className="flex items-center gap-1.5 text-amber-500 text-sm">
              <span>★★★★★</span>
              <span className="text-[11px] font-extrabold text-[#2C2319] ml-1">4.9 / 5.0</span>
            </div>
            <p className="text-[10px] text-[#8C7A65] font-semibold mt-0.5">
              2,400+ Verified Executive Clients Across India
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous review"
              className="w-7 h-7 rounded-lg bg-[#F5EFE4] hover:bg-[#EBDDC8] disabled:opacity-35 disabled:hover:bg-[#F5EFE4] border border-[#E2D4BC] flex items-center justify-center text-[#4A4033] text-xs font-bold transition active:scale-95"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === REVIEWS.length - 1}
              aria-label="Next review"
              className="w-7 h-7 rounded-lg bg-[#F5EFE4] hover:bg-[#EBDDC8] disabled:opacity-35 disabled:hover:bg-[#F5EFE4] border border-[#E2D4BC] flex items-center justify-center text-[#4A4033] text-xs font-bold transition active:scale-95"
            >
              ›
            </button>
          </div>
        </div>

        {/* Horizontal Reviews Slider Track */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[88%] sm:min-w-[75%] lg:min-w-[48%] shrink-0 snap-center bg-gradient-to-br from-[#FFFDF9] to-[#F8F2E4] border border-[#EADDC2] rounded-xl p-3.5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFE3CD] text-[#7A5013] text-[9.5px] font-extrabold border border-[#DFCBB0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Verified Client • {rev.location}
                  </span>
                  <span className="text-[9.5px] font-bold text-[#A66E13] font-cinzel">
                    {rev.number}
                  </span>
                </div>
                <p className="font-luxury-title italic text-[12px] text-[#2C2319] leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#EFE7D8] text-[10px]">
                <div>
                  <span className="font-bold text-[#2A231C] block">{rev.name}</span>
                  <span className="text-[#8C7D6B] text-[9.5px]">{rev.role}</span>
                </div>
                <span className="text-[#A49786] text-[9px] shrink-0">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sliding Bar (Interactive Progress Tracker) */}
        <div className="mt-3.5 pt-2 border-t border-[#F0E8D9]">
          <div className="flex items-center justify-between text-[10px] font-semibold text-[#8C7D6B] mb-1.5">
            <span>Client Reviews</span>
            <span className="font-bold text-[#B87910]">
              {currentIndex + 1} of {REVIEWS.length}
            </span>
          </div>

          {/* Sliding Track & Progress Bar */}
          <div
            className="w-full h-1.5 bg-[#EFE8DA] rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              const targetIdx = Math.round(clickPos * (REVIEWS.length - 1));
              scrollToIndex(targetIdx);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#B87910] via-[#C9912C] to-[#E5B558] rounded-full transition-all duration-200"
              style={{
                width: `${Math.max(15, ((currentIndex + 1) / REVIEWS.length) * 100)}%`,
              }}
            />
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to review ${i + 1}`}
                className={`transition-all duration-200 rounded-full ${
                  currentIndex === i
                    ? 'w-5 h-1.5 bg-[#B87910]'
                    : 'w-1.5 h-1.5 bg-[#DDCFBA] hover:bg-[#BAA990]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
