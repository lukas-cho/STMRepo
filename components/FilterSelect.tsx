'use client'; // because it uses useEffect & useState

import { useEffect, useState } from 'react';
import MenuGrid from '@/components/MenuGrid'

type Category = {
  id: string;
  category_name: string;
};

export default function FilterSelect({
  categoryId,
  setCategoryId,
  selectedYear,
  setSelectedYear,
}: {
  categoryId: string;
  setCategoryId: (val: string) => void;
  selectedYear: string;
  setSelectedYear: (val: string) => void;
}) {

  const [years, setYears] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`/api/years`)
      .then((res) => res.json())
      .then(setYears);
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
    // setYears(prev => ({ ...prev, year: e.target.value }));
   };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategoryId(selected);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col items-center">
      <h3 className="text-4x1 font-normal mb-4">❤️† 은혜 가득하고 사랑이 듬뿍 담긴</h3>
      <h1 className="text-5xl font-bold mb-4">선교후원 바자회 역대 메뉴</h1>
      
      <div className="flex gap-4 mb-4">

        {/* 연도 선택 드롭다운 */}
        <select 
          className="border p-2 rounded mb-4 w-40"
          value={selectedYear}
          onChange={handleYearChange}
        >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>

        {/* 카테고리 선택 드롭다운 */}
        <select
          className="border p-2 rounded mb-4 w-64"
          value={categoryId}
          onChange={handleCategoryChange}
        >
           <option value="All">All Categories</option>        
           {categories.map((cat: any) => (
             <option key={cat.id} value={cat.id}>
                {cat.category_name}
             </option>
            ))}
        </select>

      </div>
      <h2 className="text-4x1 font-normal mb-4">원하시는 메뉴를 선택하시면 해당 메뉴의 자세한 설명을 보실수 있습니다.</h2>

    </div>
  );
}
