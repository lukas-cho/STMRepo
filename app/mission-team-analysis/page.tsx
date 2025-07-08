'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { DataEntry as PeriodDataEntry } from '@/components/MissionTeamPeriodPieChart'

type MemberDataEntry = {
  name: string
  value: number
  period_start: string
  period_end: string
  member_count: number
}

const MissionTeamMemberPieChart = dynamic(
  () => import('@/components/MissionTeamMemberPieChart'),
  { ssr: false }
)
const MissionTeamPeriodPieChart = dynamic(
  () => import('@/components/MissionTeamPeriodPieChart'),
  { ssr: false }
)

export default function Page() {
  const baseYear = useMemo(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    return month < 10 ? year - 1 : year
  }, [])

  const [year, setYear] = useState(baseYear)
  const [viewMode, setViewMode] = useState<'member' | 'period'>('member')

  const [memberData, setMemberData] = useState<MemberDataEntry[]>([])
  const [periodData, setPeriodData] = useState<PeriodDataEntry[]>([])

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const res = await fetch(`/api/mission-team-member?year=${year}`)
        if (!res.ok) throw new Error('Failed to fetch member data')
        const json = await res.json()
        setMemberData(json)
      } catch {
        setMemberData([])
      }
    }

    async function fetchPeriodData() {
      try {
        const res = await fetch(`/api/mission-team-period?year=${year}`)
        if (!res.ok) throw new Error('Failed to fetch period data')
        const json = await res.json()
        setPeriodData(json)
      } catch {
        setPeriodData([])
      }
    }

    fetchMemberData()
    fetchPeriodData()
  }, [year])

  return (
<div className="px-6">
      <div >
        <h1 className="text-3xl font-bold mb-8">📊 {year}년 선교팀 분석</h1>

        <div className="mb-6">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full max-w-xs focus:ring-2 focus:ring-blue-500"
          >
            {[2022, 2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="viewMode"
              value="member"
              checked={viewMode === 'member'}
              onChange={() => setViewMode('member')}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-800 font-medium">인원별</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="viewMode"
              value="period"
              checked={viewMode === 'period'}
              onChange={() => setViewMode('period')}
              className="form-radio text-blue-600"
            />
            <span className="text-gray-800 font-medium">기간별</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {viewMode === 'member' ? (
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-4">📊 선교팀 인원수</h2>
              <MissionTeamMemberPieChart
                data={memberData.map((d) => ({
                  ...d,
                  period_start: d.period_start ?? '',
                  period_end: d.period_end ?? '',
                  member_count: d.value,
                }))}
              />
            </div>
          ) : (
            <div >
              <h2 className="text-xl font-semibold mb-4">📊 선교 기간 (일수)</h2>
              <MissionTeamPeriodPieChart data={periodData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
