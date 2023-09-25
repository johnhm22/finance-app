import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { validateAddShare } from '@/app/validations/api-validations/share';
import { isValidUUId } from '@/app/validations/validation-functions/uuid.validation';

const prisma = new PrismaClient();

//GET
// export async function GET(request: Request, { params }) {
//   const { id } = params;

export async function GET(request: NextRequest, { params }) {
  // const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes`;

  // const { searchParams } = new URL(request.url);

  const { id } = params;

  console.log('*****************************');
  console.log('*****************************');
  console.log('Inside api GET from Prisma');
  console.log('id from params: ', id);
  console.log('*****************************');
  console.log('*****************************');
  // try {
  //need to get list of tickers from postresql db

  // const tickerList = await prisma.stocksHeld.findMany({
  //   where: {
  //     userId: userId,
  //   },
  //   select: {
  //     symbol: true,
  //     share_name: true,
  //   },
  // });

  // console.log('tickerList: ', tickerList);

  // let symbolString = '';

  // tickerList.forEach((ticker) => {
  //   symbolString = symbolString + ticker.symbol + ',';
  // });

  // const result = await axios({
  //   method: 'GET',
  //   url: `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=${symbolString}`,
  // });

  // console.log('result from marketstack: ', result.data);

  // return NextResponse.json({ result: result.data, status: 200 });
  // } catch (error) {
  //   console.log('Error: ', error);
  // }

  //   try {
  //     const res = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': process.env.API_KEY!,
  //         'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  //       },
  //     });
  //     return res.json();
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
}

//DELETE

// POST
export async function POST(request: Request) {
  const {
    symbol,
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

    //need to add code to create share in database

    const newShare = await prisma.stocksHeld.create({
      data: {
        userId,
        symbol,
        share_name,
        bookCost,
        quantity,
        exchange_acronym,
        exchange_city,
        exchange_country,
        exchange_name,
      },
    });

    console.log('newShare: ', newShare);

    // const tickerList = await prisma.stocksHeld.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   select: {
    //     symbol: true,
    //     share_name: true,
    //   },
    // });

    return NextResponse.json({ message: 'New share added' });
  } catch (error) {
    console.log(error);
  }
}
