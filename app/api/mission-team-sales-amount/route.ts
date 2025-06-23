import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {
  try {
    const now = new Date()
    const currentYear = now.getFullYear()
    const baseYear = now.getMonth() + 1 < 10 ? currentYear - 1 : currentYear

    const teamIds = await prisma.mission_teams.findMany({
      where: { year: baseYear },
      select: { id: true },
    })

    const ids = teamIds.map((t) => t.id)
    if (ids.length === 0) return NextResponse.json([])

    const salesData = await prisma.mission_team_menus.groupBy({
      by: ['menu_id'],
      where: { mission_team_id: { in: ids } },
      _sum: {
        total_sales_amount: true,
      },
    })

    const menuIds = salesData.map((s) => s.menu_id)
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      select: { id: true, menu_name: true },
    })

    const result = salesData.map((s) => {
      const menu = menus.find((m) => m.id === s.menu_id)
      return {
        menu_name: menu ? menu.menu_name : 'Unknown',
        total_sales_amount: Number(s._sum.total_sales_amount ?? 0),
      }
    })

    const sortedResult = result.sort((a, b) => b.total_sales_amount - a.total_sales_amount).slice(0, 10)

    return NextResponse.json(sortedResult)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
