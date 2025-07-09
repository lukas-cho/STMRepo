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

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let aVal = a[sortKey]
      let bVal = b[sortKey]

      if (sortKey === 'startdate' || sortKey === 'enddate') {
        aVal = new Date(aVal as string).getTime()
        bVal = new Date(bVal as string).getTime()
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
    return sorted
  }, [data, sortKey, sortDirection])

  const renderSortIcon = (key: SortKey) => {
    if (key !== sortKey) return null
    return sortDirection === 'asc' ? ' 🔼' : ' 🔽'
  }

  if (!data.length) {
    return <p className="text-center text-gray-500">데이터가 없습니다.</p>
  }

  return (
    <div className="overflow-x-auto" style={{ minWidth: '800px' }}>
      <div
        className="grid border border-gray-300 rounded-xl"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', minWidth: '800px' }}
      >
        {/* 헤더 */}
        {[
          { key: 'name', label: '팀 이름' },
          { key: 'startdate', label: '기간 시작' },
          { key: 'enddate', label: '기간 종료' },
          { key: 'value', label: '기간(일)' },
          { key: 'member_count', label: '인원수' },
        ].map(({ key, label }, idx, arr) => (
          <div
            key={key}
            className={`font-semibold p-3 border-b border-gray-300 cursor-pointer select-none text-center bg-gray-100 ${
              idx !== arr.length - 1 ? 'border-r border-gray-300' : ''
            }`}
            onClick={() => handleSort(key as SortKey)}
          >
            {label}
            {renderSortIcon(key as SortKey)}
          </div>
        ))}

        {/* 데이터 행 */}
        {sortedData.map(({ name, startdate, enddate, value, member_count }, i) => (
          <React.Fragment key={i}>
            <div className="p-3 border-b border-r border-gray-300 truncate">{name}</div>
            <div className="p-3 border-b border-r border-gray-300 text-center">{startdate}</div>
            <div className="p-3 border-b border-r border-gray-300 text-center">{enddate}</div>
            <div className="p-3 border-b border-r border-gray-300 text-center">{value}</div>
            <div className="p-3 border-b text-center">{member_count}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
