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

    const teamIds = await prisma.mission_teams.findMany({
      where: { year: targetYear },
      select: { id: true },
    })

    const ids = teamIds.map((t) => t.id)

    const salesData = await prisma.mission_team_menus.groupBy({
      by: ['menu_id'],
      where: {
        mission_team_id: { in: ids },
      },
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

    const menuIds = salesData.map((s) => s.menu_id)

    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      select: { id: true, menu_name: true },
    })

    const result = salesData.map((s) => {
      const menu = menus.find((m) => m.id === s.menu_id)
      return {
        menu_name: menu ? menu.menu_name : 'Unknown',
        total_quantity_sold: s._sum.quantity_sold || 0,
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
