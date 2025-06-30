import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {
  try {
    const now = new Date()
    const currentYear = now.getFullYear()
    const baseYear = now.getMonth() + 1 < 10 ? currentYear - 1 : currentYear

    // 1) 해당 연도 미션팀 id와 description 조회
    const teams = await prisma.mission_teams.findMany({
      where: { year: baseYear },
      select: { id: true, description: true },
    })

    const teamIds = teams.map((t) => t.id)
    if (teamIds.length === 0) return NextResponse.json([])

    // 2) mission_team_menus에서 mission_team_id별, menu_id별 total_sales_amount 합계 조회
    const salesData = await prisma.mission_team_menus.groupBy({
      by: ['mission_team_id', 'menu_id'],
      where: { mission_team_id: { in: teamIds } },
      _sum: {
        total_sales_amount: true,
      },
    })

    // 3) menu_id로 메뉴명 조회
    const menuIds = [...new Set(salesData.map((s) => s.menu_id))]
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      select: { id: true, menu_name: true },
    })

    // 4) 결과에 menu_name과 mission_team description 추가
    const result = salesData.map((s) => {
      const menu = menus.find((m) => m.id === s.menu_id)
      const team = teams.find((t) => t.id === s.mission_team_id)

      return {
        menu_name: menu ? menu.menu_name : 'Unknown',
        total_sales_amount: Number(s._sum.total_sales_amount ?? 0),
        mission_team_description: team?.description ?? '',
      }
    })

    // 5) 총 매출액으로 내림차순 정렬 후 상위 10개 추출
    const sortedResult = result.sort((a, b) => b.total_sales_amount - a.total_sales_amount).slice(0, 10)

    return NextResponse.json(sortedResult)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
