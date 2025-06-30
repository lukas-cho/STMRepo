import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

// GET : 메뉴 옵션 목록 조회 (id + menu_name)
export async function GET() {
  try {
    const menuOptions = await prisma.menus.findMany({
      select: {
        id: true,
        menu_name: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(menuOptions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '메뉴 옵션 조회 실패' }, { status: 500 });
  }
}
