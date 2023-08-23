import axios from 'axios';
import { NextResponse } from 'next/server';

// GET
export async function GET(request: Request) {
  const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes`;

  try {
    const result = await axios(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY!,
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
      params: {
        region: 'GB',
        symbols: 'SMT.l,DGE.l',
      },
    });
    // return result.data.price;
    return new Response(JSON.stringify(result.data), { status: 200 });
  } catch (error) {
    console.log('Error: ', error);
  }

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
