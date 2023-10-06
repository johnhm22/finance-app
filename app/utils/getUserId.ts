'use server';

import { cookies } from 'next/headers';
import { verifyToken } from './jwt.helper';

export const getUserId = async () => {
  const codedPayload = cookies().get('accessToken');
  const payload = await verifyToken(codedPayload!.value);
  return payload;
};
