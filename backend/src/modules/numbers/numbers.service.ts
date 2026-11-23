import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { VipNumber, PaginatedResult } from '@luxury-vip/shared-types';
import { QueryNumbersDto } from './dto/query-numbers.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NumbersService implements OnModuleInit {
  private inventory: VipNumber[] = [];

  onModuleInit() {
    this.loadInventory();
  }

  private loadInventory() {
    const dataPath = path.resolve(__dirname, '../../data/numbers.json');
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      this.inventory = JSON.parse(raw);
    } else {
      console.warn(`numbers.json not found at ${dataPath}`);
    }
  }

  getAll(): VipNumber[] {
    return this.inventory;
  }

  getById(id: number): VipNumber {
    const item = this.inventory.find(i => i.id === id);
    if (!item) {
      throw new NotFoundException(`VIP Number with ID ${id} not found`);
    }
    return item;
  }

  maxRepeatCount(raw: string): number {
    if (!raw) return 0;
    const freq: Record<string, number> = {};
    for (const ch of raw) {
      if (ch >= '0' && ch <= '9') freq[ch] = (freq[ch] || 0) + 1;
    }
    const vals = Object.values(freq);
    return vals.length > 0 ? Math.max(...vals) : 0;
  }

  matchesPatternCategory(item: VipNumber, cat: string): boolean {
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

  query(dto: QueryNumbersDto): PaginatedResult<VipNumber> {
    const { category, search, price, sort, page = 1, limit = 30 } = dto;
    const q = (search || '').trim().toLowerCase();

    // 1. Filter
    let filtered = this.inventory.filter(item => {
      // Category check
      const matchesCategory = this.matchesPatternCategory(item, category || 'All');

      // Search check
      const matchesSearch = !q ||
        item.number.toLowerCase().includes(q) ||
        item.rawNumber.includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.sum !== null && item.sum !== undefined && item.sum.toString() === q) ||
        (item.root !== null && item.root !== undefined && item.root.toString() === q);

      // Price check
      let matchesPrice = true;
      if (price === 'under10k') matchesPrice = item.price < 10000;
      else if (price === '10kto50k') matchesPrice = item.price >= 10000 && item.price <= 50000;
      else if (price === '50kto200k') matchesPrice = item.price > 50000 && item.price <= 200000;
      else if (price === 'above200k') matchesPrice = item.price > 200000;

      return matchesCategory && matchesSearch && matchesPrice;
    });

    // 2. Sort
    if (sort === 'repeat-first' || sort === 'default') {
      // Primary: Price Low to High; Secondary: Max repeating digit High to Low
      filtered.sort((a, b) => {
        const priceDiff = (a.price || 0) - (b.price || 0);
        if (priceDiff !== 0) return priceDiff;
        return this.maxRepeatCount(b.rawNumber) - this.maxRepeatCount(a.rawNumber);
      });
    } else if (sort === 'price-asc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === 'sum') {
      filtered.sort((a, b) => (a.sum || 0) - (b.sum || 0));
    }

    // 3. Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);
    const hasMore = Math.max(0, total - page * limit);

    return {
      data: paginatedData,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasMore,
      },
    };
  }
}
