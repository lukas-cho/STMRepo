'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

type ProfitData = {
  menu_name: string;
  profit_rate: number;
}

export default function MissionTeamProfitChart({ year }: { year: number }) {
  const [profitData, setProfitData] = useState<ProfitData[]>([])

  useEffect(() => {
    fetch(`/api/mission-team-profits?year=${year}`)
      .then(res => res.json())
      .then((data: ProfitData[]) => {
        if (!data || data.length === 0) {
          setProfitData([{ menu_name: '', profit_rate: 0 }])
        } else {
          setProfitData(data)
        }
      })
      .catch(() => {
        setProfitData([{ menu_name: '', profit_rate: 0 }])
      })
  }, [year])

  return (
    <div className="p-6 bg-white rounded-xl shadow ">
      <h2 className="text-2xl font-bold mb-4">{year}년 메뉴별 수익률</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={profitData}>
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
              value: 'Profit Rate (%)',
              angle: -90,
              position: 'insideLeft',
              fill: '#555',
              fontWeight: 'bold',
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="profit_rate" fill="#60d394">
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
