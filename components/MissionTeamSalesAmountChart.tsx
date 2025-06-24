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

type SalesAmountData = {
  menu_name: string
  total_sales_amount: number
}

export default function MissionTeamSalesAmountChart({ year }: { year: number }) {
  const [amountData, setAmountData] = useState<SalesAmountData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/mission-team-sales-amount?year=${year}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data: SalesAmountData[]) => {
        if (!data || data.length === 0) {
          setAmountData([])
        } else {
          setAmountData(data)
        }
      })
      .catch((e) => {
        setError(e.message || 'Failed to load data')
        setAmountData([])
      })
      .finally(() => {
        setLoading(false)
      })
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

  if (amountData.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        No sales data available for {year}.
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{year}년 메뉴별 판매금액</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={amountData}>
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
            label={{
              value: 'Sales Amount ($)',
              angle: -90,
              position: 'insideLeft',
              fill: '#555',
              fontWeight: 'bold',
            }}
          />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Bar dataKey="total_sales_amount" fill="#facc15">
            <LabelList
              dataKey="total_sales_amount"
              position="insideTop"
              formatter={(value: number) => `$${value.toLocaleString()}`}
              style={{ fontWeight: 'bold', fontSize: 14, fill: '#000' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
