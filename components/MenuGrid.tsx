"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';

interface Menu {
  id: string;
  menu_name: string;
  menu_category_id: string;
  menu_categories: {
    category_name: string;
  }
}

interface MenuListProps {
    menus: Menu[];
    setMenus: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function MenuGrid({ menus, setMenus }: MenuListProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        setIsLoading(true);

        const fetchData = async () => {
            const res = await fetch('/api/menus'); // assumes API route is at /api/categories
            const data = await res.json();
            setMenus(data);
            setIsLoading(false);
        
            if (isLoading) {
                return <div className="p-6 bg-white rounded-xl shadow text-center">Loading menu data</div>
            };

            if (error) {
                return <div className="p-6 bg-white rounded-xl shadow text-center text-red-600">Error loading menu data: {error}</div>;
            };

            if ((menus as Menu[]).length === 0) {
                return (
                    <div className="p-6 bg-white rounded-xl shadow text-center">
                        No menu data are available.
                    </div>
                )
            }}        
        
        fetchData();
        
    }, [])

    return (   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menus.map((menu) => (
                <Link
                    key={menu.id}
                    href={`/menus/${menu.id}`}
                    className="block p-5 bg-white rounded-lg shadow hover:shadow-lg hover:bg-blue-50 transition duration-200 border border-gray-200"
                >
                <h3 className="text-lg font-semibold text-blue-700 mb-1">
                        {menu.menu_name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                    
                    Category: {menu.menu_categories?.category_name ?? 'Unknown category'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Total Sales: {/* {menu.total_sales_amount} */}
                    Total Items Sold: {/*{menu.quantity_sold} */}
                </p>
                </Link>
            ))}
        </div>
    );
}
