import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const countryIdParam = searchParams.get('country_id')

    if (!countryIdParam) {
      return NextResponse.json({ error: 'country_id is required' }, { status: 400 })
    }

    const country_id = Number(countryIdParam)

    const missionTeams = await prisma.mission_teams.findMany({
      where: {
        country_id,
      },
      select: {
        id: true,
        year: true,
        member_count: true,
        period_start: true,
        period_end: true,
        countries: {
          select: {
            name_ko: true,
          },
        },
      },
    })

    const totalMemberCount = missionTeams.reduce((acc, t) => acc + (t.member_count ?? 0), 0)

    const responseData = missionTeams.map((team) => ({
      country_id,
      name: team.countries?.name_ko ?? '알 수 없음',
      value: team.member_count ?? 0,
      period_start: team.period_start ?? '',
      period_end: team.period_end ?? '',
      member_count: totalMemberCount,
      year: team.year ?? 0,
    }))

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Failed to fetch mission-team-country:', error)
    return NextResponse.json({ error: 'Failed to fetch mission-team-country' }, { status: 500 })
  }
}
