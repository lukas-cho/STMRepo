'use client'

import React from 'react'

type CountryDataEntry = {
  country_id: number
  name: string
  value: number
  period_start: string
  period_end: string
  member_count: number
  year: number
}

type Props = {
  data: CountryDataEntry[]
}

export default function MissionTeamCountryGrid({ data }: Props) {
  return (
    <div className="overflow-x-auto" style={{ minWidth: '800px' }}>
      <table className="w-full border border-gray-300 rounded-xl" style={{ minWidth: '800px' }}>
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-r border-gray-300" style={{ minWidth: '150px' }}>국가</th>
            <th className="p-3 text-left border-r border-gray-300" style={{ minWidth: '80px' }}>연도</th>
            <th className="p-3 text-right border-r border-gray-300" style={{ minWidth: '100px' }}>인원 수</th>
            <th className="p-3 text-right border-r border-gray-300" style={{ minWidth: '120px' }}>기간 시작</th>
            <th className="p-3 text-right border-r border-gray-300" style={{ minWidth: '120px' }}>기간 종료</th>
            <th className="p-3 text-right" style={{ minWidth: '120px' }}>전체 멤버</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">데이터가 없습니다.</td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3 border-r border-gray-300">{item.name}</td>
                <td className="p-3 border-r border-gray-300">{item.year}</td>
                <td className="p-3 text-right border-r border-gray-300">{item.value}</td>
                <td className="p-3 text-right border-r border-gray-300">{item.period_start}</td>
                <td className="p-3 text-right border-r border-gray-300">{item.period_end}</td>
                <td className="p-3 text-right">{item.member_count}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  )
}
