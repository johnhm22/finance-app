'use server';

import { cookies } from 'next/headers';
import { verifyToken } from './jwt.helper';

export const getUserId = async (): Promise<Record<string, any | undefined>> => {
  const codedPayload = cookies().get('accessToken');
  if (codedPayload) {
    const payload = await verifyToken(codedPayload!.value);
    return payload;
  }

  return { name: '', value: '' };
};
