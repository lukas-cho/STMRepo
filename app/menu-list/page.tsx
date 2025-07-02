'use client'
import { useEffect, useState } from "react"
import CategorySelect from '@/components/CategorySelect';
import MenuGrid from '@/components/MenuGrid'

type MenuItem = {
  id: string;
  menu_name: string;
  menu_category_id: string;
  menu_categories: {
    category_name: string;
  }
};

export default function MenuListPage() {

  // const [year, setYear] = useState("2025")
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [categoryId, setCategoryId] = useState("All");

  // 필터 적용
  const filteredMenus = categoryId === "All"
  ? menus
  : menus.filter(menu => menu.menu_category_id === categoryId);

  useEffect(() => {
    const url = categoryId === "All"
      ? "/api/menus"
      : `/api/menus?categoryId=${categoryId}`;

    fetch(url)
      .then((res) => res.json())
      .then(setMenus);
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 연도 드롭다운 */}
      {/* <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <div>
            <YearSelect yearId={yearId} setYearId={setYearId} />
          </div>
        </select> */}

      {/* 카테고리 드롭다운 */}
        <div>
          <CategorySelect categoryId={categoryId} setCategoryId={setCategoryId} />
        </div>

      {/* 메뉴 카드 그리드 */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> */}
      {/* <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}> */}
      <div>
        <MenuGrid menus={filteredMenus} setMenus={setMenus} />        
      </div>

    </div>
  )
}
