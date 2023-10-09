import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './app/utils/jwt.helper';

export const middleware = async (
  req: NextRequest,
  response: NextResponse,
  next: NextResponse
) => {
  const accessToken = req.cookies.get('accessToken');

  if (!accessToken) {
    console.log('there is no accessToken');
    // return NextResponse.redirect(`${process.env.BASE_URL}/login`);
    return NextResponse.redirect(
      `https://vercel.com/johnhm22/finance-app/AZgbiDt7opjtSQBcnoTLA1oK6HXt/login`
    );
  }
  await verifyToken(accessToken.value);
};

export const config = {
  matcher: ['/home', '/api/quote', '/api/share', '/api/portfolio'],
};
