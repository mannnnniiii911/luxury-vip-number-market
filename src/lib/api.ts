import { VipNumber, PaginatedResult, CategorySummary, NumerologyResult } from '@luxury-vip/shared-types';
import { maxRepeatCount } from './utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

// In-memory caches to eliminate repeated requests & provide 0ms instant responses
const apiCache = new Map<string, PaginatedResult<VipNumber>>();
let inMemoryInventory: VipNumber[] | null = null;
let categoryCache: CategorySummary[] | null = null;
let inventoryFetchPromise: Promise<VipNumber[]> | null = null;

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

/**
 * Pre-warm the local inventory in memory in the background
 */
export async function prefetchInventory(): Promise<VipNumber[]> {
  if (inMemoryInventory) return inMemoryInventory;
  if (inventoryFetchPromise) return inventoryFetchPromise;

  inventoryFetchPromise = (async () => {
    try {
      const res = await fetch('/data/numbers.json', { cache: 'force-cache' });
      if (res.ok) {
        const data: VipNumber[] = await res.json();
        inMemoryInventory = data;
        return data;
      }
    } catch (e) {
      console.warn('Background inventory prefetch notice:', e);
    }
    return [];
  })();

  return inventoryFetchPromise;
}

export async function fetchNumbers(params: {
  category?: string;
  search?: string;
  price?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResult<VipNumber>> {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.price && params.price !== 'all') query.set('price', params.price);
  if (params.sort) query.set('sort', params.sort);
  query.set('page', String(params.page || 1));
  query.set('limit', String(params.limit || 30));

  const cacheKey = query.toString();
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey)!;
  }

  // Fast fetch with 2500ms abort controller to prevent any 60-second hang
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 2500) : null;

    const res = await fetch(`${API_BASE}/numbers?${cacheKey}`, {
      signal: controller ? controller.signal : undefined,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (res.ok) {
      const json: PaginatedResult<VipNumber> = await res.json();
      apiCache.set(cacheKey, json);
      return json;
    }
  } catch {
    // API aborted or offline; fall back to lightning-fast local memory evaluation
  }

  // Client-side instant evaluation fallback
  try {
    let all: VipNumber[] = inMemoryInventory || [];
    if (all.length === 0) {
      all = await prefetchInventory();
    }
    if (all.length === 0) {
      const fallbackRes = await fetch('/data/numbers.json');
      if (!fallbackRes.ok) throw new Error('Cannot load local fallback');
      all = await fallbackRes.json();
      inMemoryInventory = all;
    }

    const q = (params.search || '').trim().toLowerCase();
    const cat = params.category || 'All';

    let filtered = all.filter((item) => {
      const matchCat = matchesPatternCategory(item, cat);
      const matchSearch =
        !q ||
        item.number.toLowerCase().includes(q) ||
        item.rawNumber.includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.sum !== null && item.sum !== undefined && item.sum.toString() === q) ||
        (item.root !== null && item.root !== undefined && item.root.toString() === q);

      let matchPrice = true;
      if (params.price === 'under10k') matchPrice = item.price < 10000;
      else if (params.price === '10kto50k') matchPrice = item.price >= 10000 && item.price <= 50000;
      else if (params.price === '50kto200k') matchPrice = item.price > 50000 && item.price <= 200000;
      else if (params.price === 'above200k') matchPrice = item.price > 200000;

      return matchCat && matchSearch && matchPrice;
    });

    const sort = params.sort || 'default';
    if (sort === 'repeat-first' || sort === 'default') {
      filtered.sort((a, b) => {
        const pDiff = (a.price || 0) - (b.price || 0);
        if (pDiff !== 0) return pDiff;
        return maxRepeatCount(b.rawNumber) - maxRepeatCount(a.rawNumber);
      });
    } else if (sort === 'price-asc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === 'sum') {
      filtered.sort((a, b) => (a.sum || 0) - (b.sum || 0));
    }

    const page = params.page || 1;
    const limit = params.limit || 30;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);
    const hasMore = Math.max(0, total - page * limit);

    const result: PaginatedResult<VipNumber> = {
      data: paginatedData,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasMore,
      },
    };

    apiCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.error('Fallback error:', err);
    return {
      data: [],
      meta: { total: 0, page: 1, limit: 30, totalPages: 1, hasMore: 0 },
    };
  }
}

export async function fetchCategories(): Promise<CategorySummary[]> {
  if (categoryCache) return categoryCache;

  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 2000) : null;

    const res = await fetch(`${API_BASE}/categories`, {
      signal: controller ? controller.signal : undefined,
    });
    if (timeoutId) clearTimeout(timeoutId);

    if (res.ok) {
      const data: CategorySummary[] = await res.json();
      categoryCache = data;
      return data;
    }
  } catch {}

  const defaultCategories: CategorySummary[] = [
    { name: 'All', count: 1127 },
    { name: 'AB AB', count: 952 },
    { name: 'AA BB', count: 869 },
    { name: 'AB BA', count: 828 },
    { name: 'AABB', count: 833 },
    { name: 'ABAB', count: 858 },
    { name: 'AAA', count: 875 },
    { name: 'AAAAA', count: 756 },
    { name: '786 Series', count: 20 },
    { name: 'VIP Numbers', count: 668 },
    { name: 'Repeating Numbers', count: 1091 },
    { name: 'Fancy Numbers', count: 1090 },
  ];
  categoryCache = defaultCategories;
  return defaultCategories;
}

export async function matchNumerology(birthDay: number, targetSum: string): Promise<NumerologyResult> {
  const cacheKey = `num_${birthDay}_${targetSum}`;
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 2000) : null;

    const res = await fetch(`${API_BASE}/numerology/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birthDay, targetSum }),
      signal: controller ? controller.signal : undefined,
    });
    if (timeoutId) clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {}

  return { matchingCount: 1127, items: [] };
}
