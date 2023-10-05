import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (
  req: NextRequest,
  response: NextResponse,
  next: NextResponse
) => {
  const accessToken = req.cookies.get('accessToken');

  if (!accessToken) {
    console.log('there is no accessToken');
    return NextResponse.redirect('http://localhost:3000/login');
  }

  jwt.verify(
    accessToken!.toString()!,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, user) => {
      if (err)
        return new NextResponse(
          JSON.stringify({ message: 'authentication failed' })
        );
    }
  );
};

export const config = {
  matcher: ['/home', '/api/quote', '/api/share', '/api/portfolio'],
};
