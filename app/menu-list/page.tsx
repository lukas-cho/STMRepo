'use client'
import { useEffect, useState } from "react"
import FilterSelect from '@/components/FilterSelect';
import MenuGrid from '@/components/MenuGrid'

type MenuItem = {
  id: string;
  total_sales_amount: number;
  quantity_sold: number;
  menu: { 
    id: string;
    menu_name: string;
    menu_image: Buffer;
    menu_category_id: string;
    menu_categories: {
      category_name: string;
    }
  }
};

export default function MenuListPage() {

// Category and Year selections
const [categoryId, setCategoryId] = useState<string>("All");
const [selectedYear, setSelectedYear] = useState<string>("All");

// 메뉴 데이터 상태
const [menus, setMenus] = useState<MenuItem[]>([]);

// 메뉴 데이터 필터링
useEffect(() => {
  fetch(`/api/filtered-menus?year=${selectedYear}&categoryId=${categoryId}`)
    .then((res) => res.json())
    .then(setMenus);
}, [selectedYear, categoryId]);

return (
  <div className="max-w-7xl mx-auto px-4 py-10">
    {/* 연도 드롭다운 */}
    {/* 카테고리 드롭다운 */}
      <div>
        <FilterSelect 
          selectedYear={selectedYear} setSelectedYear={setSelectedYear}
          categoryId={categoryId} setCategoryId={setCategoryId} 
        />
      </div>

    {/* 메뉴 카드 그리드 */}
    <div>
      <MenuGrid 
        menus={menus} setMenus={setMenus} 
      />        
    </div>

  </div>
)
}
