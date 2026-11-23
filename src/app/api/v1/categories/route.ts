import { NextResponse } from 'next/server';
import numbersData from '../../../../../public/data/numbers.json';
import { VipNumber, CategorySummary } from '@luxury-vip/shared-types';

const inventory: VipNumber[] = numbersData as VipNumber[];

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

export async function GET() {
  const result: CategorySummary[] = CATEGORIES.map((name) => {
    if (name === 'All') {
      return { name, count: inventory.length };
    }
    const count = inventory.filter((item) => matchesPatternCategory(item, name)).length;
    return { name, count };
  });

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
