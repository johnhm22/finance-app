import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export const verifyToken = async (
  token: string
): Promise<Record<string, any>> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
      {
        algorithms: ['HS256'],
      }
    );
    return payload;
  } catch (e) {
    console.log('Error: ', e);
    if (e.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      return NextResponse.redirect('http://localhost:3000/login');
    }
  }
  return new NextResponse(
    JSON.stringify({ message: 'Error occurred during token verification' })
  );
};
