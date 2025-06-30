import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get("year");
    if (!yearStr) {
      return NextResponse.json({ error: "Year parameter is required" }, { status: 400 });
    }

    const year = parseInt(yearStr);
    if (isNaN(year)) {
      return NextResponse.json({ error: "Year must be a valid number" }, { status: 400 });
    }

    // 1) 해당 연도의 mission_teams 전체(id, description) 조회
    const teams = await prisma.mission_teams.findMany({
      where: { year },
      select: { id: true, description: true },
    });

    if (teams.length === 0) return NextResponse.json([]);

    // 팀 id -> description 매핑
    const teamDescMap = new Map<string, string>();
    teams.forEach(team => {
      teamDescMap.set(team.id.toString(), team.description ?? '');
    });

    // 2) mission_team_menus에서 year 필터 후 메뉴별 매출/재료비/수량 집계
    // mission_team_id도 함께 groupBy 해서 description 매핑 가능하도록 변경
    const groupedData = await prisma.mission_team_menus.groupBy({
      by: ["menu_id", "mission_team_id"],
      where: {
        mission_team_id: { in: teams.map(t => t.id) }
      },
      _sum: {
        total_sales_amount: true,
        ingredient_cost_amount: true,
        quantity_sold: true,
      },
    });

    // 3) 메뉴 정보 + 카테고리 조회
    const menuIds = groupedData.map(g => g.menu_id);
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
      include: { menu_categories: true },
    });

    // 4) 매출, 수익률, 수량, description 계산 후 조합
    const result = groupedData.map(g => {
      const menu = menus.find(m => m.id === g.menu_id);
      const sales = Number(g._sum.total_sales_amount ?? 0);
      const cost = Number(g._sum.ingredient_cost_amount ?? 0);
      const quantity = Number(g._sum.quantity_sold ?? 0);
      const mission_team_description = teamDescMap.get(g.mission_team_id.toString()) || '';

      return {
        id: g.menu_id,
        menu_name: menu?.menu_name ?? "Unknown",
        category_name: menu?.menu_categories.category_name ?? "Unknown",
        total_sales_amount: sales,
        profit_rate: sales === 0 ? 0 : (sales - cost) / sales,
        quantity_sold: quantity,
        mission_team_description,  // description 포함
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
