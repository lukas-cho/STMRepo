"use client";


import Link from "next/link";
import { use, useEffect, useState } from 'react';

interface Menu {
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
  }}
}

interface MenuGridProps {
    menus: Menu[];
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

export default function MenuGrid({ menus, setMenus }: MenuGridProps) {

    if (!menus || menus.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        No menu data available for the selected filter.
      </div>
        );
    }
 
    return (   
        <div className="max-w-none mx-auto px-4 py-10">
            
            <div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
            >

            {menus.map((item) => (
                <Link
                    key={item.id}
                    href={`/menu-list/${item.id}`}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:bg-blue-50 transition duration-300 p-6"
                >

                <img
                    src={item.menu.menu_image}
                    alt={item.menu.menu_name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />
                
                <h3 className="text-xl font-bold text-blue-700 mb-1">
                        {item.menu.menu_name}
                </h3>

                <p className="text-sm text-gray-500">                    
                    Category: {item.menu.menu_categories?.category_name ?? 'Unknown category'}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                    Total Sales: {item.total_sales_amount}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Total Items Sold: {item.quantity_sold}
                </p>
                </Link>
            ))}
            
            </div>

        </div>
    );
}
