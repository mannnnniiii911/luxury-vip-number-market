import { NextRequest, NextResponse } from 'next/server';
import numbersData from '../../../../../../public/data/numbers.json';
import { VipNumber } from '@luxury-vip/shared-types';

const inventory: VipNumber[] = numbersData as VipNumber[];

export async function POST(req: NextRequest) {
  try {
    const { birthDay, targetSum } = await req.json();

    const matched = inventory.filter((item) => {
      const itemSumSingle = item.sum % 9 === 0 ? 9 : item.sum % 9;
      return (
        targetSum === 'any' ||
        !targetSum ||
        item.sum.toString() === targetSum ||
        itemSumSingle.toString() === targetSum ||
        (birthDay && itemSumSingle.toString() === birthDay.toString())
      );
    });

    return NextResponse.json({
      matchingCount: matched.length,
      items: matched,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid numerology payload' },
      { status: 400 }
    );
  }
}
