"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

interface Menu {
  id: string;
  menu_name: string;
  menu_image: string;
  menu_category_id: string;
  menu_categories: {
    category_name: string;
  };
}

interface MenuGridProps {
  menus: Menu[];
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

export default function MenuGrid({ menus, setMenus }: MenuGridProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/menus"); // assumes API route is at /api/categories
      const data = await res.json();
      setMenus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        Loading menu data ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center text-red-600">
        Error loading menu data: {error}
      </div>
    );
  }

  if ((menus as Menu[]).length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        No menu data are available.
      </div>
    );
  }

  return (
    <div className="max-w-none mx-auto px-4 py-10">
      {/* <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"> */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {menus.map((menu) => (
          <Link
            key={menu.id}
            href={`/menu-list/${menu.id}`}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:bg-blue-50 transition duration-300 p-6"
          >
            <img
              src={menu.menu_image}
              alt={menu.menu_name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-bold text-blue-700 mb-1">
              {menu.menu_name}
            </h3>

            <p className="text-sm text-gray-500">
              Category:{" "}
              {menu.menu_categories?.category_name ?? "Unknown category"}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Total Sales: {/*menu.total_cost*/}
              Total Items Sold: {/*{menu.quantity_sold} */}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
