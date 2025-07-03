// /api/categories/route.ts (Next.js API route)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function GET() {

  const menug = await prisma.menus.findMany({
    include: { menu_categories: true },
    orderBy: { menu_name: 'asc' }
  });

  // Convert image bytes to base64 data URLs
  const menusWithImageData = menug.map((menu) => {
  
    const buffer = menu.menu_image;

    const base64Image =
    buffer && Buffer.isBuffer(buffer)
      ? buffer.toString('base64')
      : Buffer.from(buffer as any).toString('base64'); // safely fallback if it's Uint8Array

    return {
      ...menu,
      menu_image: buffer
        ? `data:image/jpeg;base64,${base64Image}`
        : '', // or a placeholder URL if preferred
    };
  
  });

  return NextResponse.json(menusWithImageData);
  // return NextResponse.json(menug);

}