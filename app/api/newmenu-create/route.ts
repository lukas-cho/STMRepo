import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { NewMenuSchema } from "@/lib/zod-schema";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // formData에서 각 필드 값 읽기 (string)
    const data = {
      menu_category_id: formData.get("menu_category_id")?.toString() || "",
      menu_name: formData.get("menu_name")?.toString() || "",
      menu_contact_email: formData.get("menu_contact_email")?.toString() || "",
      menu_url: formData.get("menu_url")?.toString() || "",
      menu_ingredient: formData.get("menu_ingredient")?.toString() || "",
      menu_instruction: formData.get("menu_instruction")?.toString() || "",
      serving_size: formData.get("serving_size")?.toString() || "",
      total_cost: formData.get("total_cost")?.toString() || "",
      // menu_image는 별도 처리
    };

    // 이미지 파일 처리: File → Buffer 변환
    const imageFile = formData.get("menu_image") as File | null;
    let imageBuffer: Buffer | null = null;

    if (imageFile && imageFile.size > 0) {
      imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    }

    // 스키마 검증 (문자열 기준)
    const parsed = NewMenuSchema.safeParse(data);
    if (!parsed.success) {
      console.error(parsed.error.format());
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    // 숫자 타입 변환 후 DB 저장
    const created = await prisma.menus.create({
      data: {
        menu_category_id: parsed.data.menu_category_id,
        menu_name: parsed.data.menu_name,
        menu_contact_email: parsed.data.menu_contact_email,
        menu_url: parsed.data.menu_url,
        menu_ingredient: parsed.data.menu_ingredient,
        menu_instruction: parsed.data.menu_instruction,
        serving_size: parsed.data.serving_size ? Number(parsed.data.serving_size) : 0,
        total_cost: parsed.data.total_cost ? Number(parsed.data.total_cost) : 0,
        created_at: new Date(),
        menu_image: imageBuffer, // Buffer 형태로 직접 저장
      },
    });

    return NextResponse.json(created, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
