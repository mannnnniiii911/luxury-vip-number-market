'use client';

import React, { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  priceFilter: string;
  sortFilter: string;
  onApply: (category: string, priceFilter: string, sortFilter: string) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  category,
  priceFilter,
  sortFilter,
  onApply,
}) => {
  const [selectedCat, setSelectedCat] = useState(category);
  const [selectedPrice, setSelectedPrice] = useState(priceFilter);
  const [selectedSort, setSelectedSort] = useState(sortFilter);

  useEffect(() => {
    setSelectedCat(category);
    setSelectedPrice(priceFilter);
    setSelectedSort(sortFilter);
  }, [category, priceFilter, sortFilter, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedCat, selectedPrice, selectedSort);
    onClose();
  };

  return (
    <div id="filter-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#FCFAF6] rounded-2xl max-w-sm w-full p-5 border border-[#E7D6B0] shadow-modal z-10">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADDC2]">
          <h3 className="font-luxury-title font-bold text-lg text-[#231C14]">Filter VIP Numbers</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#EFE8DA] flex items-center justify-center text-[#4A4033] hover:bg-[#E2D8C5]"
          >
            ✕
          </button>
        </div>
        <div className="py-4 space-y-3.5 text-xs text-[#3E3429]">
          <div>
            <label className="font-bold block mb-1.5">Category Filter</label>
            <select
              id="modal-category-select"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full bg-white border border-[#D9CCB4] rounded-xl p-2 font-semibold outline-none"
            >
              <option value="All">All Categories</option>
              <option value="AB AB">AB AB</option>
              <option value="AA BB">AA BB</option>
              <option value="AB BA">AB BA</option>
              <option value="AABB">AABB</option>
              <option value="ABAB">ABAB</option>
              <option value="AAA">AAA</option>
              <option value="AAAAA">AAAAA</option>
              <option value="786 Series">786 Series</option>
              <option value="VIP Numbers">VIP Numbers</option>
              <option value="Repeating Numbers">Repeating Numbers</option>
              <option value="Fancy Numbers">Fancy Numbers</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-1.5">Price Range</label>
            <select
              id="modal-price-select"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-white border border-[#D9CCB4] rounded-xl p-2 font-semibold outline-none"
            >
              <option value="all">Any Price</option>
              <option value="under10k">Budget: Under ₹10,000</option>
              <option value="10kto50k">Mid-Tier: ₹10,000 - ₹50,000</option>
              <option value="50kto200k">Premium: ₹50,000 - ₹2,00,000</option>
              <option value="above200k">Ultra Luxury: Above ₹2,00,000</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-1.5">Sort By</label>
            <select
              id="modal-sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full bg-white border border-[#D9CCB4] rounded-xl p-2 font-semibold outline-none"
            >
              <option value="default">Featured (Repeat First, Price Low→High)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sum">Sum Total Ascending</option>
            </select>
          </div>
        </div>
        <div className="pt-2 flex gap-2">
          <button
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl bg-[#B87910] text-white font-bold text-xs shadow-xs hover:bg-[#9E670D] transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
