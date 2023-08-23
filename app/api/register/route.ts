import { PrismaClient } from '@prisma/client';

import { IRegisterForm } from '@/types';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// POST
export async function POST(request: Request) {
  const data: IRegisterForm = await request.json();
  try {
    const { username, password, lastName, firstName } = data;

    const hashedPassword = await bcrypt.hash(password, 10); //generates salt and then hashedPassword

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    console.log('user: ', user);
  } catch (error) {
    console.log('Error: ', error);
  }
  return NextResponse.json({ message: 'user created' });

  //   try {

  //use local db with prisma

  //     const result = await axios(url, {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': process.env.API_KEY!,
  //         'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  //       },
  //     });
  //     // return result.data.price;
  //     return new Response(JSON.stringify(result.data), { status: 200 });
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }

  //   try {
  //     const res = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': process.env.API_KEY!,
  //         'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  //       },
  //     });
  //     return res.json();
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
}
