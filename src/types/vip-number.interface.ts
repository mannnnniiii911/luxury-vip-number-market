export interface VipNumber {
  id: number;
  title: string;
  number: string;
  rawNumber: string;
  sum: number;
  planet: string;
  status: 'Ready' | 'Reserved' | 'Sold' | string;
  price: number;
  originalPrice: number;
  discount: string;
  categories: string[];
  badge: string;
  score: number;
  root: number;
}

export type PriceFilter = 'all' | 'under10k' | '10kto50k' | '50kto200k' | 'above200k';

export type SortFilter = 'default' | 'repeat-first' | 'price-asc' | 'price-desc' | 'sum';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: number;
  };
}

export interface CategorySummary {
  name: string;
  count: number;
}

export interface NumerologyQuery {
  birthDay: number;
  targetSum: string;
}

export interface NumerologyResult {
  matchingCount: number;
  items: VipNumber[];
}
