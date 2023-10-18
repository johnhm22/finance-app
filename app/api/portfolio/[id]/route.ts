import prisma from '@/app/utils/prisma.library';
import { isValidUUId } from '@/app/validations/validation-functions/uuid.validation';
import { StocksHeld } from '@prisma/client';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (!isValidUUId(id)) {
      throw new Error('Invalid user id');
    }
    const stocksHeld: StocksHeld[] = await prisma.stocksHeld.findMany({
      where: {
        userId: id.trim(),
      },
      orderBy: {
        symbol: 'asc',
      },
    });

    if (stocksHeld) {
      const symbolArray: string[] = [];

      stocksHeld.forEach((stock) => {
        symbolArray.push(stock.symbol);
      });

      const quoteCall = await axios({
        url: `https://api.marketstack.com/v1/eod/latest?access_key=${
          process.env.MARKETSTACK_ACCESS_KEY
        }&symbols=${symbolArray.toString()}`,
      });

      if (quoteCall) {
        quoteCall.data.data.forEach((el: { close: number }, idx: number) => {
          stocksHeld[idx].price = el.close;
        });
      }
    }
    return NextResponse.json({ stocksHeld: stocksHeld });
  } catch (e) {
    console.log('Error: ', e);
  }
}
