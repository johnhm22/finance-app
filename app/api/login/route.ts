import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtVerify, SignJWT } from 'jose';

import { ILoginForm } from '@/types';
import { runInNewContext } from 'vm';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const data: ILoginForm = await req.json();
  const { username, password } = data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return NextResponse.json({ message: 'User or password incorrect' });
    }
    const isPasswordMatch =
      password && (await bcrypt.compare(password, user.password));
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'User or password incorrect' });
    }
    const updatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: 'admin',
    };

    // const accessToken = jwt.sign(
    //   updatedUser,
    //   process.env.ACCESS_TOKEN_SECRET!,
    //   { expiresIn: 10 }
    // );

    const accessToken = await new SignJWT(updatedUser)
      .setExpirationTime('2h')
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));

    const refreshToken = await new SignJWT(updatedUser)
      .setExpirationTime('2h')
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!));

    // const signToken = async (
    //   payload: Record<string, any>,
    //   expiresIn: number
    // ): Promise<string> => {
    //   const currentSeconds = Math.floor(Date.now() / 1000);

    //   return new SignJWT(payload)
    //     .setExpirationTime(currentSeconds + expiresIn)
    //     .setProtectedHeader({ alg: "HS256" })
    //     .setIssuedAt()
    //     .sign(new TextEncoder().encode(JWT_SECRET));
    // };

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      // expires: Date.now() + 15,
    });

    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return NextResponse.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
