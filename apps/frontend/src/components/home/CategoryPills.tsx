'use client';

import React from 'react';

const CATEGORIES = [
  'All',
  'AB AB',
  'AA BB',
  'AB BA',
  'AABB',
  'ABAB',
  'AAA',
  'AAAAA',
  '786 Series',
  'VIP Numbers',
  'Repeating Numbers',
  'Fancy Numbers',
];

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="w-full px-5 py-2 overflow-x-auto no-scrollbar" data-purpose="category-navigation">
      <div id="filter-pills" className="flex items-center gap-2 whitespace-nowrap min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`filter-pill px-3.5 py-2 rounded-xl text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 transition ${
                isSelected
                  ? 'border border-[#DDB858] bg-[#F8F1DE] text-[#A66E13] shadow-sm'
                  : 'bg-[#EDE5D5] text-[#4A4033] hover:bg-[#E4D9C5] shadow-xs'
              }`}
            >
              {cat === 'All' && (
                <svg className="w-3.5 h-3.5 fill-[#B3791B]" viewBox="0 0 24 24">
                  <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
                </svg>
              )}
              <span className="leading-tight">{cat}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
