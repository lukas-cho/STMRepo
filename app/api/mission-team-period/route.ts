import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
import dayjs from 'dayjs'

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

const result = teams.map((team) => {
  let period = 0
  if (team.period_start && team.period_end) {
    const start = dayjs(team.period_start)
    const end = dayjs(team.period_end)
    period = end.diff(start, 'day') + 1
  }
  return {
    name: team.description || `팀 ${team.id.slice(0, 4)}`,
    value: period,  // 기간 일수 넣기
    startdate: team.period_start ? dayjs(team.period_start).format('YYYY-MM-DD') : '',
    enddate: team.period_end ? dayjs(team.period_end).format('YYYY-MM-DD') : '',
    member_count: team.member_count || 0, // 인원수 추가
  }
})


  return NextResponse.json(result)
}
