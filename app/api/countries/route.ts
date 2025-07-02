// app/api/countries/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'  // prisma 클라이언트 경로 맞게 수정하세요

export async function GET() {
  try {
    const countries = await prisma.countries.findMany({
      select: {
        id: true,
        name_en: true,
        name_ko: true,
      },
      orderBy: {
        name_ko: 'asc',
      },
    })

    return NextResponse.json(countries)
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
  }
}
