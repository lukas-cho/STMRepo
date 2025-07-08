'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
   Tooltip,   
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts'

const RADIAN = Math.PI / 180
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E67E22']

export type DataEntry = {
  name: string
  value: number
  startdate: string
  enddate: string
}

interface Props {
  data: DataEntry[]
}

export default function MissionTeamMemberPieChart({ data }: Props) {
  const parsePos = (pos: string | number | undefined, size: number): number => {
    if (pos === undefined) return size / 2
    if (typeof pos === 'string' && pos.endsWith('%')) {
      return (parseFloat(pos) / 100) * size
    }
    if (typeof pos === 'number') {
      return pos
    }
    return 0
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PieLabelRenderProps & { index: number }) => {
    if (index === undefined || !data[index]) return null
    if (percent === undefined) return null

    const cxNum = parsePos(cx, 400)
    const cyNum = parsePos(cy, 400)
    const inner = parsePos(innerRadius, 400)
    const outer = parsePos(outerRadius, 400)
    const radius = inner + (outer - inner) * 0.5
    const x = cxNum + radius * Math.cos(-midAngle * RADIAN)
    const y = cyNum + radius * Math.sin(-midAngle * RADIAN)
    const fontSize = Math.min(Math.max(percent * 50, 10), 18)

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight="bold"
      >
        <tspan x={x} dy="0">{`${data[index].name}`}</tspan>
        <tspan x={x} dy="1.2em">{`${data[index].value}명 (${(percent * 100).toFixed(1)}%)`}</tspan>
      </text>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-row gap-8" style={{ alignItems: 'flex-start' }}>
        {/* 차트 영역: 고정 크기, flexShrink 0 */}
        <div style={{ width: 400, height: 400, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="60%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 그리드 영역: 최소너비 유지 + 남은 공간 차지 + 가로스크롤 가능 */}
        <div
          className="border border-gray-300 rounded"
          style={{ minWidth: 800, flexGrow: 1, overflowX: 'auto' }}
        >
          {/* 헤더 */}
          <div
            className="grid border-b border-gray-300 font-semibold"
            style={{ gridTemplateColumns: '5fr 1fr 5fr' }}
          >
            <div className="p-2 border-r border-gray-300 last:border-r-0">팀 이름</div>
            <div className="p-2 text-center border-r border-gray-300 last:border-r-0">인원수</div>
            <div className="p-2 text-center last:border-r-0">기간</div>
          </div>

          {data.map((entry, i) => (
            <div
              key={i}
              className="grid border-b border-gray-300 last:border-b-0"
              style={{
                gridTemplateColumns: '5fr 1fr 5fr',
                lineHeight: '1.2',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              }}
            >
              <div className="p-2 border-r border-gray-300 last:border-r-0 truncate">{entry.name}</div>
              <div className="p-2 text-center border-r border-gray-300 last:border-r-0">{entry.value}</div>
              <div className="p-2 text-center last:border-r-0">{`${entry.startdate} ~ ${entry.enddate}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
