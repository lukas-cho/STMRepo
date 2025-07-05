import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  
  const year = searchParams.get("year") || "All";
  const parsedYear = year !== "All" ? parseInt(year) : undefined;
  
  const categoryId = searchParams.get("categoryId");
  const categoryFilter = categoryId !== "All" && categoryId != null ? categoryId : undefined;

try {
  const filteredMenus = await prisma.mission_team_menus.findMany({
    where: {
        mission_teams: parsedYear !== undefined 
            ? { year: parsedYear }
            : undefined,
        
        menus: categoryFilter !== undefined
        ? { menu_category_id: categoryFilter }
        : undefined,        
      },
    
    select: {
      id: true,
      quantity_sold: true,
      total_sales_amount: true,
      menus: {
          select: {
            id: true,
            menu_name: true,
            menu_image: true,
            menu_category_id: true,
            menu_categories: {
              select: {
                category_name: true,
                },
              },
            },
          },
      },
});

    const filteredMenusWithImageData = filteredMenus.map((record) => {

      const buffer = record.menus?.menu_image;

      const base64Image =
          buffer && Buffer.isBuffer(buffer)
          ? buffer.toString('base64')
          : buffer
            ? Buffer.from(buffer as any).toString('base64')
            : ""; // safely fallback if it's Uint8Array

          return {
            ...record,
            menu: {
              ...record.menus,
              menu_image: buffer
                ? `data:image/jpeg;base64,${base64Image}`
                : '', // or a placeholder URL if preferred
            },
            menu_image: buffer
            ? `data:image/jpeg;base64,${base64Image}`
            : '', // or a placeholder URL if preferred
          };
    });
  // Optionally group by menu ID to aggregate if needed

  return NextResponse.json(filteredMenusWithImageData);
  // return NextResponse.json(filteredMenus);
} catch (error) {
  console.error("Error fetching filtered menus:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
