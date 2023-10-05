import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { validateAddShare } from '@/app/validations/api-validations/share';
import { isValidUUId } from '@/app/validations/validation-functions/uuid.validation';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const {
    symbol,
    mic,
    share_name,
    bookCost,
    quantity,
    userId,
    exchange_acronym,
    exchange_city,
    exchange_country,
    exchange_name,
  } = await request.json();

  try {
    if (!isValidUUId(userId)) {
      throw new Error('Invalid user id');
    }
    const result = validateAddShare(
      symbol,
      mic,
      share_name,
      bookCost,
      quantity,
      exchange_acronym,
      exchange_city,
      exchange_country,
      exchange_name
    );

    const { errors, isValid } = result;
    if (!isValid) {
      throw new Error('Invalid data', errors);
    }

    const newShare = await prisma.stocksHeld.create({
      data: {
        userId,
        symbol,
        mic,
        share_name,
        bookCost,
        quantity,
        exchange_acronym,
        exchange_city,
        exchange_country,
        exchange_name,
      },
    });
    return NextResponse.json({ response: newShare });
  } catch (error) {
    console.log(error);
  }
}
