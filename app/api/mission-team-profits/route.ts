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

    // 1) 해당 연도의 mission_teams 전체(id, description) 조회
    const teams = await prisma.mission_teams.findMany({
      where: { year: targetYear },
      select: { id: true, description: true },
    })

    if (teams.length === 0) return NextResponse.json([])

    // team id 배열
    const teamIds = teams.map((t) => t.id)

    // 2) mission_team_menus에서 팀에 속한 메뉴별 집계 조회
    const profitData = await prisma.mission_team_menus.groupBy({
      by: ['menu_id', 'mission_team_id'],
      where: { mission_team_id: { in: teamIds } },
      _sum: {
        total_sales_amount: true,
        ingredient_cost_amount: true,
        quantity_sold: true,
      },
    })

    const menuIds = profitData.map((p) => p.menu_id)
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      select: { id: true, menu_name: true },
    })

    // mission_team_id -> description 맵 생성
    const teamDescMap = new Map<string, string>()
    teams.forEach(team => {
      teamDescMap.set(team.id.toString(), team.description ?? '')
    })

    // 결과에 description 추가
    const result = profitData.map((p) => {
      const menu = menus.find((m) => m.id === p.menu_id)
      const sales = p._sum.total_sales_amount ? Number(p._sum.total_sales_amount) : 0
      const cost = p._sum.ingredient_cost_amount ? Number(p._sum.ingredient_cost_amount) : 0
      const profit = sales - cost
      const profitRate = sales > 0 ? Math.round((profit / sales) * 100) : 0
      const description = teamDescMap.get(p.mission_team_id.toString()) ?? ''

      return {
        menu_name: menu ? menu.menu_name : 'Unknown',
        quantity_sold: p._sum.quantity_sold ?? 0,
        total_sales_amount: sales,
        profit_amount: profit,
        profit_rate: profitRate,
        mission_team_description: description,  // 여기에 description 추가
      }
    })

    const sortedResult = result.sort((a, b) => b.profit_rate - a.profit_rate).slice(0, 10)

    return NextResponse.json(sortedResult)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
