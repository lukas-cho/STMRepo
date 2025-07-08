import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
import dayjs from 'dayjs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = Number(searchParams.get('year'))

  const teamsmembers = await prisma.mission_teams.findMany({
    where: { year },
    select: {
      id: true,
      description: true,
      period_start: true,
      period_end: true,
      member_count: true,
    },
  })

const result = teamsmembers.map((teamsmember) => {
  return {
    name: teamsmember.description || `팀 ${teamsmember.id.slice(0, 4)}`,
    value: teamsmember.member_count || 0,  // 기간 일수 대신 인원수 넣기
    period_start: teamsmember.period_start ? dayjs(teamsmember.period_start).format('YYYY-MM-DD') : '',
    period_end: teamsmember.period_end ? dayjs(teamsmember.period_end).format('YYYY-MM-DD') : '',
    member_count: teamsmember.member_count || 0,
  }
})
  console.log('API result:', result);
  console.log('teamsmembers:', teamsmembers)
  return NextResponse.json(result)
}
