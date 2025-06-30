'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'

type SalesData = {
  menu_name: string
  total_quantity_sold: number
}

export default function MissionTeamSalesChart({ year }: { year: number }) {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/mission-team-sales?year=${year}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data: SalesData[]) => {
        setSalesData(data)
      })
      .catch((e) => {
        setError(e.message || 'Failed to load data')
        setSalesData([])
      })
      .finally(() => setLoading(false))
  }, [year])

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        Loading sales data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center text-red-600">
        Error loading data: {error}
      </div>
    )
  }

  // 데이터 없을 때 축 유지용 dummy 데이터
  const dummyData = [{ menu_name: '', total_quantity_sold: 0 }]

  return (
    <div className="p-6 bg-white rounded-xl shadow relative">
      <img src="/mission.jpg" alt="십자가" className="w-12 h-8 absolute top-7 left-75" />
      <h2 className="text-2xl font-bold mb-4">메뉴별 판매수량</h2>

      {/* 데이터 없을 때 메시지 */}
      {salesData.length === 0 && (
        <div className="mb-4 text-center text-gray-700 font-semibold">

          {year}년 메뉴별 판매수량 데이터가 없습니다.
          <div className="h-4" /> {/* 빈 줄 */}
        </div>
      )}

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={salesData.length === 0 ? dummyData : salesData}
          barCategoryGap={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="menu_name"
            label={{
              value: 'Menu Name',
              position: 'insideBottom',
              offset: -5,
              fill: '#555',
              fontWeight: 'bold',
            }}
          />
          <YAxis
            width={80}
            label={{
              value: 'Quantity Sold',
              angle: -90,
              position: 'center',
              dx: -30,
              fill: '#555',
              fontWeight: 'bold',
            }}
          />
          <Tooltip
            formatter={(value: any) =>
              typeof value === 'number' ? `$${value.toLocaleString()}` : ''
            }
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-2 border rounded shadow">
                    <p>{typeof data.total_sales_amount === 'number' ? `$${data.total_sales_amount.toLocaleString()}` : ''}</p> {/* 금액 */}
                    <p className="mt-1 text-sm text-gray-600">{data.mission_team_description}</p> {/* 설명 */}
                  </div>
                )
              }
              return null
            }}
          />

          <Bar dataKey="total_quantity_sold" fill="#38bdf8" barSize={20}>
            <LabelList
              dataKey="total_quantity_sold"
              position="insideTop"
              formatter={(value: number) => value.toLocaleString()}
              style={{ fontWeight: 'bold', fontSize: 14, fill: '#000' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}
