'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { DataEntry as PeriodDataEntry } from '@/components/MissionTeamPeriodPieChart'
import MissionTeamCountryPieChart from '@/components/MissionTeamCountryPieChart'

type CountryDataEntry = {
  country_id: number
  name: string
  value: number
  period_start: string
  period_end: string
  member_count: number
  year: number
}

type CountryInfo = {
  id: number
  name_ko: string
  name_en: string
}

// 차트 컴포넌트 동적 import
const MissionTeamMemberPieChart = dynamic(() => import('@/components/MissionTeamMemberPieChart'), { ssr: false })
const MissionTeamPeriodPieChart = dynamic(() => import('@/components/MissionTeamPeriodPieChart'), { ssr: false })

export default function Page() {
  const baseYear = useMemo(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    return month < 10 ? year - 1 : year
  }, [])

  const [year, setYear] = useState(baseYear)
  const [viewMode, setViewMode] = useState<'member' | 'period' | 'country'>('member')

  const [memberData, setMemberData] = useState<any[]>([])
  const [periodData, setPeriodData] = useState<PeriodDataEntry[]>([])

  // countries 목록
  const [countries, setCountries] = useState<CountryInfo[]>([])
  // 현재 선택된 국가 ID
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)
  // 선택된 나라 mission team 데이터
  const [countryData, setCountryData] = useState<CountryDataEntry[]>([])

  // 1) 기본 데이터들 fetch
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/countries')
        if (!res.ok) throw new Error('Failed to fetch countries')
        const json = await res.json()
        setCountries(json)
        if (json.length > 0 && selectedCountryId === null) {
          setSelectedCountryId(json[0].id) // 기본 선택 첫 나라
        }
      } catch (e) {
        console.error(e)
      }
    }

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

    async function fetchCountryMissionTeams() {
      if (selectedCountryId === null) return
      try {
        const res = await fetch(`/api/mission-team-country?year=${year}&country_id=${selectedCountryId}`)
        if (!res.ok) throw new Error('Failed to fetch country mission team data')
        const json = await res.json()
        setCountryData(json)
      } catch (e) {
        console.error(e)
        setCountryData([])
      }
    }

    fetchCountries()
    fetchMemberData()
    fetchPeriodData()
    fetchCountryMissionTeams()
  }, [year, selectedCountryId])

  return (
    <div className="px-6">
      <h1 className="text-3xl font-bold mb-8">📊 {year}년 선교팀 분석</h1>

      {/* 뷰 모드 라디오 버튼 그룹 */}
      <div className="mb-4 flex items-center space-x-6">
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

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="viewMode"
            value="country"
            checked={viewMode === 'country'}
            onChange={() => setViewMode('country')}
            className="form-radio text-blue-600"
          />
          <span className="text-gray-800 font-medium">국가별</span>
        </label>
      </div>

      {/* viewMode가 'country'일 때는 나라 드롭다운, 아니면 연도 드롭다운 */}
      {viewMode === 'country' ? (
        <div className="mb-6">
          <select
            className="border border-gray-300 rounded-lg p-3 w-full max-w-xs focus:ring-2 focus:ring-blue-500"
            value={selectedCountryId ?? ''}
            onChange={(e) => setSelectedCountryId(Number(e.target.value))}
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ko} ({c.name_en})
              </option>
            ))}
          </select>
        </div>
      ) : (
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
      )}

      {/* 차트 및 그리드 출력 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {viewMode === 'member' && (
          <div >
            <h2 className="text-xl font-semibold mb-0">📊 선교팀 인원수</h2>
            <MissionTeamMemberPieChart
              data={memberData.map((d) => ({
                ...d,
                period_start: d.period_start ?? '',
                period_end: d.period_end ?? '',
                member_count: d.value,
              }))}
            />
          </div>
        )}

        {viewMode === 'period' && (
          <div >
            <h2 className="text-xl font-semibold mb-4">📊 선교 기간 (일수)</h2>
            <MissionTeamPeriodPieChart data={periodData} />
          </div>
        )}

        {viewMode === 'country' && (
          <div >
            <h2 className="text-xl font-semibold mb-4">📊 선교 국가별</h2>

            {/* 선택된 나라 mission team 데이터 그리드 */}
            <MissionTeamCountryPieChart data={countryData} />
          </div>
        )}
      </div>
    </div>
  )
}
