import { Injectable } from '@nestjs/common';
import { NumbersService } from '../numbers/numbers.service';
import { CategorySummary } from '@luxury-vip/shared-types';

@Injectable()
export class CategoriesService {
  constructor(private readonly numbersService: NumbersService) {}

  private readonly categoryList = [
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

  getCategories(): CategorySummary[] {
    const all = this.numbersService.getAll();
    return this.categoryList.map(name => {
      if (name === 'All') {
        return { name, count: all.length };
      }
      const count = all.filter(item => this.numbersService.matchesPatternCategory(item, name)).length;
      return { name, count };
    });
  }
}
