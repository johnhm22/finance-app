import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ILoginForm } from '@/types';

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
    const accessToken = jwt.sign(
      updatedUser,
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: 10 }
    );

    const refreshToken = jwt.sign(
      updatedUser,
      process.env.REFRESH_TOKEN_SECRET!
    );

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
