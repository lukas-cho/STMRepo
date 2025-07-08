'use client'

import React, { useState, useMemo } from 'react'

export type DataEntry = {
  name: string
  value: number
  startdate: string
  enddate: string
  member_count: number
}

interface Props {
  data: DataEntry[]
}

type SortKey = keyof DataEntry

export default function MissionTeamDataGrid({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('value')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 헤더 클릭 시 정렬 상태 변경
  function handleSort(key: SortKey) {
    if (key === sortKey) {
      // 같은 컬럼 클릭 시 방향 반전
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // 다른 컬럼 클릭 시 새 기준으로, 방향은 asc로 초기화
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  // 정렬된 데이터 계산
  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let aVal = a[sortKey]
      let bVal = b[sortKey]

      // 날짜는 문자열 -> Date 변환
      if (sortKey === 'startdate' || sortKey === 'enddate') {
        aVal = new Date(aVal as string).getTime()
        bVal = new Date(bVal as string).getTime()
      }

      // 숫자와 문자열 모두 비교 가능하도록 처리
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
    return sorted
  }, [data, sortKey, sortDirection])

  // 정렬 아이콘 표시
  function renderSortIcon(key: SortKey) {
    if (key !== sortKey) return null
    return sortDirection === 'asc' ? ' 🔼' : ' 🔽'
  }

  if (!data.length) {
    return <p className="text-center text-gray-500">데이터가 없습니다.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div
        className="grid gap-4 border border-gray-300 rounded"
        style={{ minWidth: 800, gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
      >
        {/* 헤더 */}
        <div
          className="font-semibold p-2 border-b border-r border-gray-300 cursor-pointer select-none"
          onClick={() => handleSort('name')}
        >
          팀 이름{renderSortIcon('name')}
        </div>
        <div
          className="font-semibold p-2 border-b border-r border-gray-300 cursor-pointer select-none"
          onClick={() => handleSort('startdate')}
        >
          기간 시작{renderSortIcon('startdate')}
        </div>
        <div
          className="font-semibold p-2 border-b border-r border-gray-300 cursor-pointer select-none"
          onClick={() => handleSort('enddate')}
        >
          기간 종료{renderSortIcon('enddate')}
        </div>
        <div
          className="font-semibold p-2 border-b border-r border-gray-300 cursor-pointer select-none text-center"
          onClick={() => handleSort('value')}
        >
          기간(일){renderSortIcon('value')}
        </div>
        <div
          className="font-semibold p-2 border-b border-gray-300 cursor-pointer select-none text-center"
          onClick={() => handleSort('member_count')}
        >
          인원수{renderSortIcon('member_count')}
        </div>

        {/* 데이터 행 */}
        {sortedData.map(({ name, startdate, enddate, value, member_count }, i) => (
          <React.Fragment key={i}>
            <div className="p-2 border-b border-r border-gray-300 truncate">{name}</div>
            <div className="p-2 border-b border-r border-gray-300">{startdate}</div>
            <div className="p-2 border-b border-r border-gray-300">{enddate}</div>
            <div className="p-2 border-b border-r border-gray-300 text-center">{value}</div>
            <div className="p-2 border-b border-gray-300 text-center">{member_count}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}



// 'use client'

// import React from 'react'
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   PieLabelRenderProps,
//   ResponsiveContainer,
// } from 'recharts'

// const RADIAN = Math.PI / 180
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E67E22']

// export type DataEntry = {
//   name: string
//   value: number
//   startdate: string
//   enddate: string
// }

// interface Props {
//   data: DataEntry[]
// }

// // X 좌표 계산용 함수
// const parsePosX = (pos: string | number | undefined, chartWidth: number): number => {
//   if (pos === undefined) return chartWidth / 2
//   if (typeof pos === 'string' && pos.endsWith('%')) {
//     return (parseFloat(pos) / 100) * chartWidth
//   }
//   if (typeof pos === 'number') return pos
//   return 0
// }

// // Y 좌표 계산용 함수
// const parsePosY = (pos: string | number | undefined, chartHeight: number): number => {
//   if (pos === undefined) return chartHeight / 2
//   if (typeof pos === 'string' && pos.endsWith('%')) {
//     return (parseFloat(pos) / 100) * chartHeight
//   }
//   if (typeof pos === 'number') return pos
//   return 0
// }

// export default function MissionTeamPeriodPieChart({ data }: Props) {
//   // 라벨 커스텀 함수
//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     index,
//     percent = 0,
//   }: PieLabelRenderProps & { index: number; percent?: number }) => {
//     if (index === undefined || !data[index]) return null

//     const chartWidth = 400
//     const chartHeight = 400

//     const cxNum = parsePosX(cx, chartWidth)
//     const cyNum = parsePosY(cy, chartHeight)
//     const inner = typeof innerRadius === 'number' ? innerRadius : 0
//     const outer = typeof outerRadius === 'number' ? outerRadius : 0
//     const radius = inner + (outer - inner) * 0.5

//     const x = cxNum + radius * Math.cos(-midAngle * RADIAN)
//     const y = cyNum + radius * Math.sin(-midAngle * RADIAN)

//     const { name, value, startdate, enddate } = data[index]

//     // 퍼센트에 따라 글자 크기 동적 조절 (최소 10, 최대 18)
//     const fontSize = Math.min(Math.max(percent * 50, 10), 18)

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="black"
//         textAnchor="middle"
//         dominantBaseline="middle"
//         fontSize={fontSize}
//         fontWeight="bold"
//       >
//         <tspan x={x} dy="0">{name}</tspan>
//         <tspan x={x} dy="1.2em"  fontSize={fontSize * 0.8}>{`${startdate} ~ ${enddate}`}</tspan>
//         <tspan x={x} dy="1.2em"  fontSize={fontSize * 0.7}>{`${value}일`}</tspan>
//       </text>
//     )
//   }

//   if (!data.length) {
//     return <p className="text-center text-gray-500">데이터가 없습니다.</p>
//   }

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderCustomizedLabel}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value: number) => `${value}일`} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }
