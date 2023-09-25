import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET
export async function GET(req: NextRequest) {
  // const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes`;

  // const body = await req.json();

  // console.log('request.json(): ', request.json());
  console.log('*****************************');
  console.log('*****************************');
  console.log('Inside api GET from Prisma');
  // console.log('body: ', body);
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
