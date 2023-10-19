import { jwtVerify, errors, SignJWT, JWTPayload } from 'jose';
import { NextResponse } from 'next/server';
import { differenceInMinutes } from 'date-fns';
import { cookies } from 'next/headers';

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

    updateTokenForActiveUser(payload);

    return payload;
  } catch (e) {
    if (e instanceof errors.JOSEError) {
      return { error: e.code };
    }
  }
  return NextResponse.json({
    message: 'Error occurred during token verification',
  });
};

const updateTokenForActiveUser = async (payload: JWTPayload) => {
  const validityDuration = differenceInMinutes(
    new Date(payload.exp! * 1000),
    new Date(payload.iat! * 1000)
  );

  const validityRemainderPeriod: number = differenceInMinutes(
    new Date(payload.exp! * 1000),
    new Date()
  );

  if (validityRemainderPeriod <= 0.5 * validityDuration) {
    //issue new token
    const refreshUserData = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      role: payload.role,
    };

    const accessToken = await new SignJWT(refreshUserData)
      .setExpirationTime(process.env.ACCESS_TOKEN_DURATION!)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
    });
  }
};
