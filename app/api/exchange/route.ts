import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await Promise.all([
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=FTSE.INDX&limit=1`,
      }),
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=IXIC.INDX&limit=1`,
      }),
      axios({
        method: 'GET',
        url: `https://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=DJI.INDX&limit=1`,
      }),
    ]);

    const data = result.map((res) => res.data);
    const resolvedData = data.flat();
    console.log('resolvedData: ', resolvedData);

    return NextResponse.json({ resolvedData: resolvedData });
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
