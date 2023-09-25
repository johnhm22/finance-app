import prisma from '@/app/utils/prisma.library';
import { validateDeleteShare } from '@/app/validations/api-validations/share';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }) {
  const { id } = params;
  try {
    const result = validateDeleteShare(id);
    const deleteShare = await prisma.stocksHeld.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Share successfully delete' });
  } catch (e) {
    console.log('Api error: ', e);
  }
}
