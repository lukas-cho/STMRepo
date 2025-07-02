// /api/categories/route.ts (Next.js API route)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {

  const menug = await prisma.menus.findMany({
    include: { menu_categories: true },
    orderBy: { menu_name: 'asc' }
  });

  return NextResponse.json(menug);

}