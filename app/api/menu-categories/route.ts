import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prismaClient";

export async function GET() {
  const categories = await prisma.menu_categories.findMany({
    orderBy: { created_at: 'asc' }
  })
  return NextResponse.json(categories)
}
