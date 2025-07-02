// /api/categories/route.ts (Next.js API route)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {

  const categories = await prisma.menu_categories.findMany({
    orderBy: { category_name: 'asc' }
  });

  return NextResponse.json(categories);

}
