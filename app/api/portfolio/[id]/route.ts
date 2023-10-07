import prisma from '@/app/utils/prisma.library';
import { StocksHeld } from '@prisma/client';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// GET
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const stocksHeld: StocksHeld[] = await prisma.stocksHeld.findMany({
      where: {
        userId: id.trim(),
      },
    });

    if (stocksHeld) {
      const symbolArray: string[] = [];

      stocksHeld.forEach((stock) => {
        symbolArray.push(stock.symbol);
      });

      const quoteCall = await axios({
        url: `http://api.marketstack.com/v1/eod/latest?access_key=${
          process.env.MARKETSTACK_ACCESS_KEY
        }&symbols=${symbolArray.toString()}`,
      });
      if (quoteCall) {
        quoteCall.data.data.forEach((el: object, idx: number) => {
          stocksHeld[idx].price = el.close;
        });
      }
    }
    return NextResponse.json({ stocksHeld: stocksHeld });
  } catch (e) {
    console.log('Error: ', e);
  }
}
