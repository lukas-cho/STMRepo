import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  
  const year = searchParams.get("year") || "All";
  const parsedYear = year !== "All" ? parseInt(year) : undefined;
  
  const categoryId = searchParams.get("categoryId");
  const categoryFilter = categoryId !== "All" && categoryId != null ? categoryId : undefined;

try {

  if (parsedYear === undefined) {

    // If no year is provided, fetch all menus without filtering by year
    const menus = await prisma.menus.findMany({
      where: {
        menu_category_id: categoryFilter !== undefined ? categoryFilter : undefined,
      },
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
    });

    const menusWithImageData = menus.map((menu) => {

      const buffer = menu.menu_image;
      const base64Image =
          buffer && Buffer.isBuffer(buffer)
          ? buffer.toString('base64')
          : buffer
            ? Buffer.from(buffer as any).toString('base64')
            : ""; // safely fallback if it's Uint8Array

          return {
            id: menu.id,
            quantity_sold: null,
            total_sales_amount: null,
            menu: {
            ...menu,
            menu_image: buffer
                ? `data:image/jpeg;base64,${base64Image}`
                : '', // or a placeholder URL if preferred
            },
            menu_image: buffer
            ? `data:image/jpeg;base64,${base64Image}`
            : '', // or a placeholder URL if preferred
          };
      });
      return NextResponse.json(menusWithImageData);

  } else {

    // Fetch filtered menus based on the provided year and category
    // If year is "All", it will not filter by year
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

    const menusWithImageData = filteredMenus.map((record) => {

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
      return NextResponse.json(menusWithImageData);
    } // else
    // return NextResponse.json(menusWithImageData);

  } catch (error) {
      console.error("Error fetching filtered menus:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } 
}