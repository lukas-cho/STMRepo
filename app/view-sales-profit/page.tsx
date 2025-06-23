'use client'

import { useEffect, useState } from 'react'

type MenuSalesProfit = {
  id: string
  menu_name: string
  category_name: string
  quantity_sold: number
  total_sales_amount: number
  profit_rate: number
}

export default function MenuSalesProfitPage() {
  const [year, setYear] = useState<number>(2025)
  const [data, setData] = useState<MenuSalesProfit[]>([])
  const [sortKey, setSortKey] = useState<'sales' | 'profit' | 'quantity' | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const years = [2025, 2024]

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/menu-sales-profit?year=${year}`)
      const json = await res.json()
      setData(json)
    }
    fetchData()
  }, [year])

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0
    let valA: number, valB: number
    if (sortKey === 'sales') {
      valA = a.total_sales_amount
      valB = b.total_sales_amount
    } else if (sortKey === 'profit') {
      valA = a.profit_rate
      valB = b.profit_rate
    } else {
      valA = a.quantity_sold
      valB = b.quantity_sold
    }
    if (valA === valB) return 0
    if (sortOrder === 'asc') return valA > valB ? 1 : -1
    else return valA < valB ? 1 : -1
  })

  const onSortClick = (key: 'sales' | 'profit' | 'quantity') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="year" className="font-semibold">
          Year:
        </label>
        <select
          id="year"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      
      {sortedData.length === 0 ? (
        <p>No data available for {year}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Menu Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th
                  className="border border-gray-300 px-4 py-2 text-right cursor-pointer"
                  onClick={() => onSortClick('quantity')}
                >
                  Quantity Sold {sortKey === 'quantity' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 text-right cursor-pointer"
                  onClick={() => onSortClick('sales')}
                >
                  Sales Amount {sortKey === 'sales' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 text-right cursor-pointer"
                  onClick={() => onSortClick('profit')}
                >
                  Profit Rate {sortKey === 'profit' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.menu_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.category_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity_sold}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${item.total_sales_amount.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {(item.profit_rate * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
