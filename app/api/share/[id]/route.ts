import prisma from '@/app/utils/prisma.library';
import { validateDeleteShare } from '@/app/validations/api-validations/share';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }) {
  const { id } = params;
  try {
    const result = validateDeleteShare(id);
    await prisma.stocksHeld.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Share successfully deleted' });
  } catch (e) {
    console.log('Api error: ', e);
  }
}

export async function PUT(request: NextRequest, { params }) {
  const { id } = params;
  const { symbol, bookCost, quantity } = await request.json();

  try {
    const result = validateDeleteShare(id);
    const updatedShare = await prisma.stocksHeld.update({
      where: {
        id: id,
      },
      data: {
        symbol,
        bookCost: +bookCost,
        quantity: +quantity,
      },
    });
    return NextResponse.json({
      message: 'Share successfully updated',
      updatedShare: updatedShare,
    });
  } catch (e) {
    console.log('Api error: ', e);
  }
}
