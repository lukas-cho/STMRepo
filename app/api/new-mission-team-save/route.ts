import { NextRequest, NextResponse } from 'next/server'
import { MissionTeamSchema } from '@/lib/zod-schema'
import { prisma } from '@/lib/prismaClient'

// POST 요청 : 새로운 mission team 추가
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 데이터 검증
    const parseResult = MissionTeamSchema.safeParse(body)
    if (!parseResult.success) {
      const message = parseResult.error.issues.map(issue => issue.message).join(', ')
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { country, year, member_count, period_start, period_end, description, contact_email } = body

    // DB insert
    const newMissionTeam = await prisma.mission_teams.create({
      data: {
        country,
        year,
        member_count,
        period_start,
        period_end,
        description,
        contact_email,
      },
    })

    return NextResponse.json(newMissionTeam, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET 요청 : 모든 mission team 조회
export async function GET(req: NextRequest) {
  try {
    const teams = await prisma.mission_teams.findMany({
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json(teams, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch mission teams' }, { status: 500 })
  }
}
