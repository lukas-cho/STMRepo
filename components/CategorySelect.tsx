'use client'; // because it uses useEffect & useState

import { useEffect, useState } from 'react';
import MenuGrid from '@/components/MenuGrid'

type Category = {
  id: string;
  category_name: string;
};

export default function CategorySelect({
  categoryId,
  setCategoryId,
}: {
  categoryId: string;
  setCategoryId: (val: string) => void;
}) {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories') // assumes API route is at /api/categories
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategoryId(selected);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col items-center">
      <h3 className="text-4x1 font-normal mb-4">은혜 가득하고 사랑이 듬뿍 담긴</h3>
      <h1 className="text-5xl font-bold mb-4">선교후원 바자회 역대 메뉴</h1>
      
      <select
        className="border p-2 rounded mb-4 w-full"
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
      <h2 className="text-4x1 font-normal mb-4">원하시는 메뉴를 선택하시면 해당 메뉴의 자세한 설명을 보실수 있습니다.</h2>
    </div>
  );
}
