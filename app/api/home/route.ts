import { ILoginForm } from '@/types';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, res: NextResponse) {
  const data: ILoginForm = await request.json(); //this won't work in a GET request only when there is a body
  const { username, password } = data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
