import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { notFound } from "next/navigation";
import MenuDetailClient from "@/components/menuDetailClient";
import { fetchSalesAndQuantityData } from "@/lib/fetchSalesAndQuantityData";
import detailedSalesData from "@/components/detailedSalesChart"
import { Buffer } from "buffer";

function hexToBase64(hexString: string | null | undefined): string | null {
  if (!hexString) return null;
  const cleanHex = hexString.replace(/^\\x/, ""); // \x 제거
  const buffer = Buffer.from(cleanHex, "hex");
  return buffer.toString("base64");
}

export default async function MenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: menu, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", (await params).id)
    .single();

  if (!menu || error) {
    return notFound();
  }

  const base64Image = hexToBase64(menu.menu_image);
  const imageSrc = base64Image ? `data:image/jpeg;base64,${base64Image}` : null;

     const { salesData, quantityData, detailedSalesData } = await fetchSalesAndQuantityData(menu.id);
  // const { salesData, quantityData } = { salesData: [], quantityData: [] };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-center">
      <h1 className="text-4xl font-bold">{menu.menu_name}</h1>
      <p className="text-gray-600 mt-2">단기선교에 후원해 주셔서 감사합니다.</p>

      {imageSrc && imageSrc.trim() !== "" && (
        <div className="mt-6">
          <img
            src={imageSrc}
            alt="메뉴 이미지"
            width={500}
            height={200}
            className="rounded-lg object-cover mx-auto"
          />
        </div>
      )}

      <MenuDetailClient
        menu={menu}
        salesData={salesData}
        quantityData={quantityData}
        detailedSalesData={detailedSalesData}
      />
    </div>
  );
}
