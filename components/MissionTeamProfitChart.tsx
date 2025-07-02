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

type ProfitData = {
  menu_name: string
  profit_rate: number
}

export default function MissionTeamProfitChart({ year }: { year: number }) {
  const [profitData, setProfitData] = useState<ProfitData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/mission-team-profits?year=${year}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data: ProfitData[]) => {
        setProfitData(data)
      })
      .catch((e) => {
        setError(e.message || 'Failed to load data')
        setProfitData([])
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

  // 데이터 없을 때 축 표시용 dummy 데이터
  const dummyData = [{ menu_name: '', profit_rate: 0 }]

  return (
    <div className="p-6 bg-white rounded-xl shadow relative">
      <img src="/mission.jpg" alt="십자가" className="w-12 h-8 absolute top-7 left-78" />
      <h2 className="text-2xl font-bold mb-4"> 메뉴별 수익률</h2>

      {/* 데이터 없을 때 메시지 */}
      {profitData.length === 0 && (
        <div className="mb-4 text-center text-gray-700 font-semibold">
          {year}년 메뉴별 수익률 데이터가 없습니다.
          <div className="h-4" />  {/* 빈 줄 */}
        </div>
      )}

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={profitData.length === 0 ? dummyData : profitData}
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
              value: 'Profit Rate (%)',
              angle: -90,
              position: 'center',
              fill: '#555',
              fontWeight: 'bold',
            }}
          />
          <Tooltip
            formatter={(value: any) => (typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : '')}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 border rounded shadow max-w-xs">
                    <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{data.mission_team_description || '설명 없음'}</p> {/* 설명 */}
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar dataKey="profit_rate" fill="#60d394" barSize={20}>
            <LabelList
              dataKey="profit_rate"
              position="insideTop"
              formatter={(v: number) => `${v}%`}
              style={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}
