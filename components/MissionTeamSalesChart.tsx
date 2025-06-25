'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type SalesData = {
  menu_name: string;
  total_quantity_sold: number;
};

export default function MissionTeamSalesChart({ year }: { year: number }) {
  const [salesData, setSalesData] = useState<SalesData[]>([])

  useEffect(() => {
    fetch(`/api/mission-team-sales?year=${year}`)
      .then(res => res.json())
      .then((data: SalesData[]) => {
        if (!data || data.length === 0) {
          setSalesData([{ menu_name: '', total_quantity_sold: 0 }])
        } else {
          setSalesData(data)
        }
      })
      .catch(() => {
        setSalesData([{ menu_name: '', total_quantity_sold: 0 }])
      })
  }, [year])

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{year}년 메뉴별 판매수량</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={salesData} barCategoryGap={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="menu_name"
            label={{ value: 'Menu Name', position: 'insideBottom', offset: -5, fill: '#555', fontWeight: 'bold' }}
          />
          <YAxis
            label={{ value: 'Quantity Sold', angle: -90, position: 'insideLeft', fill: '#555', fontWeight: 'bold' }}
          />
          <Tooltip />
          <Bar
            dataKey="total_quantity_sold"
            fill="#38bdf8"
            barSize={20}
            label={{
              position: 'insideTop',
              fill: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
