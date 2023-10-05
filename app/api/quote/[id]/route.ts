import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }) {
  const { id } = params;
  try {
    const response = await axios({
      url: `http://api.marketstack.com/v1/eod/latest?access_key=${process.env.MARKETSTACK_ACCESS_KEY}&symbols=${id}`,
      method: 'GET',
    });
    return NextResponse.json({ response: response.data });
  } catch (e) {
    console.log('Error: ', e);
  }
}
