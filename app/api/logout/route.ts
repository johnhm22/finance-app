import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  console.log('inside api/logout route');

  try {
    console.log('************************');
    // console.log('allCookies[3]: ', allCookies[3]);
    // console.log('************************');
    // cookies().delete(allCookies[3]);
    // cookies().delete(allCookies['refreshToken']);
    // req.cookies.delete('accessToken');
    // req.cookies.delete('refreshToken');
    console.log('************************');
    console.log('accessToken? ', req.cookies.has('accessToken'));
    console.log('refreshToken? ', req.cookies.has('refreshToken'));
    console.log('get cookies in logout route: ', cookies().getAll());
    console.log('************************');
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
