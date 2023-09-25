'use server';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getUserId = (): JwtPayload | null | string => {
  const codedPayload = cookies().get('accessToken')?.value;
  const payload = jwt.decode(codedPayload!);
  return payload;
};
