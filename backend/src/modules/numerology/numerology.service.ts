import { Injectable } from '@nestjs/common';
import { NumbersService } from '../numbers/numbers.service';
import { NumerologyResult } from '@luxury-vip/shared-types';

@Injectable()
export class NumerologyService {
  constructor(private readonly numbersService: NumbersService) {}

  match(birthDay: number, targetSum: string): NumerologyResult {
    const all = this.numbersService.getAll();
    const matched = all.filter(item => {
      const itemSumSingle = item.sum % 9 === 0 ? 9 : item.sum % 9;
      return (
        targetSum === 'any' ||
        item.sum.toString() === targetSum ||
        itemSumSingle.toString() === targetSum ||
        itemSumSingle.toString() === birthDay.toString()
      );
    });

    return {
      matchingCount: matched.length,
      items: matched,
    };
  }
}
