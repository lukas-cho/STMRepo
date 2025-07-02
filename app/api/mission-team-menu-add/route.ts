import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";
import { MissionTeamMenuSchema } from "@/lib/zod-schema";

export async function POST(request: NextRequest) {
  try {
    let body: any;

    if (request.headers.get("content-type")?.includes("application/json")) {
      body = await request.json();
    } else if (
      request.headers.get("content-type")?.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await request.json();
    }

    const parsed = MissionTeamMenuSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      mission_team_id,
      menu_id,
      unit_price,
      quantity_available,
      quantity_sold = 0,
      total_sales_amount = 0,
      ingredient_cost_amount = 0,
      sales_tip,
      profit_margin, // 기본값 설정
    } = parsed.data;

    const newRecord = await prisma.mission_team_menus.create({
      data: {
        mission_team_id,
        menu_id,
        unit_price: new Prisma.Decimal(unit_price),
        quantity_available: Number(quantity_available),
        quantity_sold: Number(quantity_sold),
        total_sales_amount: new Prisma.Decimal(total_sales_amount),
        ingredient_cost_amount: ingredient_cost_amount
          ? new Prisma.Decimal(ingredient_cost_amount)
          : new Prisma.Decimal(0),

        sales_tip: sales_tip || "",
        profit_margin: profit_margin || "0.00", // 기본값 설정
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("미션 팀 메뉴 생성 오류:", error);
    return NextResponse.json(
      { error: "미션 팀 메뉴 생성 실패" },
      { status: 500 }
    );
  }
}
