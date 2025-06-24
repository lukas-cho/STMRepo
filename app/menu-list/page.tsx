'use client'
import { useState } from "react"

export default function MenuListPage() {
  const [year, setYear] = useState("2025")
  const [category, setCategory] = useState("All")

  // 예시 메뉴 데이터
  const menus = [
    { id: 1, name: "Chicken Teriyaki", category: "Food", year: "2025" },
    { id: 2, name: "Beef Taco", category: "Food", year: "2024" },
    { id: 3, name: "Coffee", category: "Beverage", year: "2025" },
    { id: 4, name: "Boba", category: "Beverage", year: "2024" },
    { id: 5, name: "Car Wash", category: "Service", year: "2025" },
    { id: 6, name: "Cake", category: "Dessert", year: "2025" },
  ]

  // 필터 적용
  const filteredMenus = menus.filter(menu =>
    (year === "All" || menu.year === year) &&
    (category === "All" || menu.category === category)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 검색 섹션 */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        {/* 연도 드롭다운 */}
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        {/* 카테고리 드롭다운 */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Beverage">Beverage</option>
          <option value="Dessert">Dessert</option>
          <option value="Service">Service</option>
        </select>

        {/* Search 버튼 */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* 메뉴 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenus.map(menu => (
          <div key={menu.id} className="p-5 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">{menu.name}</h2>
            <p className="text-gray-600">Category: {menu.category}</p>
            <p className="text-gray-500 text-sm">Year: {menu.year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
