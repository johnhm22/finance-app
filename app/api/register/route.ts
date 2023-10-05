import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { validateRegistration } from '@/app/validations/api-validations/register';
import { IRegisterForm } from '@/types';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: IRegisterForm = await request.json();
  try {
    const { username, password, lastName, firstName } = data;
    const result = validateRegistration(
      username,
      password,
      lastName,
      firstName
    );
    const { errors, isValid } = result;
    if (!isValid) {
      throw new Error('Invalid data', errors);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log('Error: ', error);
  }
  return NextResponse.json({ message: 'user created' });
}
