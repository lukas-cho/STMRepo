
import { supabase } from "@/lib/supabaseClient";
import Image from 'next/image';
import { notFound } from "next/navigation";
import MenuDetailClient from "@/components/menuDetailClient";
import { fetchSalesAndQuantityData } from "@/app/api/fetchSalesData/route";


export default async function MenuDetailPage({ params }: { params: { id: any } }) {
    const { data: menu, error } = await supabase
        .from('menus')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!menu || error) {
        return notFound();
    }

    const { salesData, quantityData } = await fetchSalesAndQuantityData(menu.id);

    return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-center">
      <h1 className="text-4xl font-bold">{menu.menu_name}</h1>
      <p className="text-gray-600 mt-2">단기선교에 후원해 주셔서 감사합니다.</p>

      {menu.menu_image_url && (
        <div className="mt-6">
          <Image
            src={menu.menu_image_url}
            alt="메뉴 이미지"
            width={1000}
            height={400}
            className="rounded-lg object-cover mx-auto"
          />
        </div>
      )}

     
      <MenuDetailClient menu={menu} salesData={salesData} quantityData={quantityData} />
    </div>
  );
}