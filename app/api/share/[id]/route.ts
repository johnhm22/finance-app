import prisma from '@/app/utils/prisma.library';
import {
  validateDeleteShare,
  validateEditShare,
} from '@/app/validations/api-validations/share';
import { isValidUUId } from '@/app/validations/validation-functions/uuid.validation';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (!isValidUUId(id)) {
      throw new Error('Invalid user id');
    }
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { symbol, bookCost, quantity } = await request.json();

  try {
    if (!isValidUUId(id)) {
      throw new Error('Invalid user id');
    }
    const result = validateEditShare(symbol, bookCost, quantity);
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
