import { jwtVerify, errors } from 'jose';
import { NextResponse } from 'next/server';

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
    if (
      e instanceof errors.JOSEError &&
      e.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'
    ) {
      return NextResponse.redirect(`${process.env.BASE_URL}/login`);
    }
  }
  return new NextResponse(
    JSON.stringify({ message: 'Error occurred during token verification' })
  );
};
