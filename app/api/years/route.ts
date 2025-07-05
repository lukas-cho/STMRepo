// /api/categories/route.ts (Next.js API route)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {

  const years = await prisma.mission_teams.findMany({
    distinct: ['year'],
    orderBy: { year: 'desc' },
    select: { year: true },
  });

//   return NextResponse.json(years);
  const uniqueYears = years.map((entry) => entry.year);

  return NextResponse.json(uniqueYears);

}