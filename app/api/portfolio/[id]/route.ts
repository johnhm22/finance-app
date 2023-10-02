import prisma from '@/app/utils/prisma.library';
import { StocksHeld } from '@prisma/client';
import axios from 'axios';
import { NextResponse } from 'next/server';

// GET
export async function GET(request: Request, { params }) {
  const { id } = params;
  try {
    const stocksHeld: StocksHeld[] = await prisma.stocksHeld.findMany({
      where: {
        userId: id.trim(),
      },
    });
console.log('stocksHeld from portfolio backend: ', stocksHeld);


if(stocksHeld){
  const symbolArray: string[] = [];

stocksHeld.forEach((stock)=>{
symbolArray.push(stock.symbol)
});

console.log('symbolArray: ', symbolArray);
console.log('symbolArray.toString(): ', symbolArray.toString());

const quoteCall = await axios({
  url: `http://api.marketstack.com/v1/eod/latest?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=${symbolArray.toString()}`
})

console.log('quoteCall.data.data: ', quoteCall.data.data);

//iterate over quoteCall.data.data
//extract close price for each call
//insert into each object in stocksHeld

// type StocksHeldWithPrice = {
//   price: number & StocksHeld
// }



if(quoteCall){
  quoteCall.data.data.forEach((el, idx: number)=>{
stocksHeld[idx].price = el.close
  })
}

console.log('revised stocksHeld: ', stocksHeld);

}

//need to iterate over stocksHeld, get symbol and call marketStack for eod/latest price
//insert price into stocksHeld and return to frontend

    return NextResponse.json({ stocksHeld: stocksHeld });
  } catch (e) {
    console.log('Error: ', e);
  }

  // try {
  //   const result = await axios(url, {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': process.env.API_KEY!,
  //       'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  //     },
  //     params: {
  //       region: 'GB',
  //       symbols: 'SMT.l,DGE.l',
  //     },
  //   });
  //   console.log('result.data: ', result.data);
  //   // return result.data.price;
  //   return new Response(JSON.stringify(result.data), { status: 200 });
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