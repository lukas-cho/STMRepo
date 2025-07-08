import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = Number(searchParams.get('year'))

  const teams = await prisma.mission_teams.findMany({
    where: { year },
    select: {
      id: true,
      description: true,
      member_count: true,
      period_start: true,
      period_end: true,
    },
  })

const result = teams.map(({ id, description, member_count, period_start, period_end }) => ({
  name: description || (id ? `팀 ${id.slice(0, 4)}` : '팀 이름 없음'),
  value: member_count,
  startdate: period_start,
  enddate: period_end,
}))


  return NextResponse.json(result)
}
