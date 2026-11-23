import { NextRequest, NextResponse } from 'next/server';
import numbersData from '../../../../../public/data/numbers.json';
import { VipNumber } from '@luxury-vip/shared-types';

const inventory: VipNumber[] = numbersData as VipNumber[];

function maxRepeatCount(raw: string): number {
  if (!raw) return 0;
  const freq: Record<string, number> = {};
  for (const ch of raw) {
    if (ch >= '0' && ch <= '9') freq[ch] = (freq[ch] || 0) + 1;
  }
  const vals = Object.values(freq);
  return vals.length > 0 ? Math.max(...vals) : 0;
}

function matchesPatternCategory(item: VipNumber, cat: string): boolean {
  if (!cat || cat === 'All') return true;
  if (item.categories && item.categories.includes(cat)) return true;
  if (item.badge && item.badge === cat) return true;

  const num = item.rawNumber || item.number.replace(/\D/g, '');
  if (cat === 'AB AB' || cat === 'ABAB') {
    return /(..).*\1/.test(num.slice(-4)) || /(.)(.)\1\2/.test(num);
  }
  if (cat === 'AA BB' || cat === 'AABB') {
    return /(.)\1(.)\2/.test(num);
  }
  if (cat === 'AB BA') {
    return /(.)(.)\2\1/.test(num);
  }
  if (cat === 'AAA') {
    return /(.)\1\1/.test(num);
  }
  if (cat === 'AAAAA') {
    return /(.)\1\1\1\1/.test(num);
  }
  if (cat === '786 Series' || cat === '786') {
    return num.includes('786');
  }
  if (cat === 'VIP Numbers' || cat === 'VIP NUMBER') {
    return item.badge === 'VIP NUMBER' || (item.categories && item.categories.includes('VIP NUMBER'));
  }
  if (cat === 'Repeating Numbers') {
    return /(.)\1/.test(num);
  }
  if (cat === 'Fancy Numbers') {
    return /(.)\1{2,}/.test(num) || /(..).*\1/.test(num) || num.includes('786');
  }
  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'All';
  const search = (searchParams.get('search') || '').trim().toLowerCase();
  const price = searchParams.get('price') || 'all';
  const sort = searchParams.get('sort') || 'default';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '30', 10);

  let filtered = inventory.filter((item) => {
    const matchesCategory = matchesPatternCategory(item, category);
    const matchesSearch =
      !search ||
      item.number.toLowerCase().includes(search) ||
      item.rawNumber.includes(search) ||
      (item.title && item.title.toLowerCase().includes(search)) ||
      (item.sum !== null && item.sum !== undefined && item.sum.toString() === search) ||
      (item.root !== null && item.root !== undefined && item.root.toString() === search);

    let matchesPrice = true;
    if (price === 'under10k') matchesPrice = item.price < 10000;
    else if (price === '10kto50k') matchesPrice = item.price >= 10000 && item.price <= 50000;
    else if (price === '50kto200k') matchesPrice = item.price > 50000 && item.price <= 200000;
    else if (price === 'above200k') matchesPrice = item.price > 200000;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (sort === 'repeat-first' || sort === 'default') {
    filtered.sort((a, b) => {
      const priceDiff = (a.price || 0) - (b.price || 0);
      if (priceDiff !== 0) return priceDiff;
      return maxRepeatCount(b.rawNumber) - maxRepeatCount(a.rawNumber);
    });
  } else if (sort === 'price-asc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sort === 'sum') {
    filtered.sort((a, b) => (a.sum || 0) - (b.sum || 0));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);
  const hasMore = Math.max(0, total - page * limit);

  return NextResponse.json({
    data: paginatedData,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasMore,
    },
  });
}
