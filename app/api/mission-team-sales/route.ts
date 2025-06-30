import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const yearParam = searchParams.get('year')

    const now = new Date()
    const currentYear = now.getFullYear()
    const baseYear = now.getMonth() + 1 < 10 ? currentYear - 1 : currentYear

    let targetYear = baseYear
    if (yearParam !== null) {
      const parsedYear = parseInt(yearParam)
      if (!isNaN(parsedYear)) {
        targetYear = parsedYear
      }
    }

    // 해당 연도의 미션팀 정보(id, description) 가져오기
    const teams = await prisma.mission_teams.findMany({
      where: { year: targetYear },
      select: { id: true, description: true },
    })

    if (teams.length === 0) return NextResponse.json([])

    // 팀 ID 목록 (문자열로 변환)
    const teamIds = teams.map((t) => t.id.toString())

    // 해당 팀들의 메뉴별 판매량 집계 (상위 10개)
    const salesData = await prisma.mission_team_menus.groupBy({
      by: ['menu_id', 'mission_team_id'],
      where: { mission_team_id: { in: teamIds } },
      _sum: {
        quantity_sold: true,
      },
      orderBy: {
        _sum: {
          quantity_sold: 'desc',
        },
      },
      take: 10,
    })

    // 메뉴 이름 조회
    const menuIds = salesData.map((s) => s.menu_id)
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      select: { id: true, menu_name: true },
    })

    // 팀 id -> description 매핑
    const teamDescMap = new Map<string, string>()
    teams.forEach((team) => {
      teamDescMap.set(team.id.toString(), team.description ?? '')
    })

    // 최종 결과 배열 생성 (메뉴 이름, 판매 수량, 팀 설명 포함)
    const result = salesData.map((s) => {
      const menu = menus.find((m) => m.id === s.menu_id)
      return {
        menu_name: menu ? menu.menu_name : 'Unknown',
        total_quantity_sold: s._sum.quantity_sold || 0,
        mission_team_description: teamDescMap.get(s.mission_team_id.toString()) || '',
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
