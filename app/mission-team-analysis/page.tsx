'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { DataEntry as PeriodDataEntry } from '@/components/MissionTeamPeriodPieChart'

// 인원수 데이터 타입
type MemberDataEntry = {
  name: string
  value: number
  period_start: string
  period_end: string
  member_count: number
}

// 차트 컴포넌트 동적 로딩 (SSR 제외)
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6"> {year}년 선교팀 분석</h1>

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border p-2 mb-6 w-full max-w-xs"
      >
        {[2022, 2023, 2024, 2025].map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>

      <div className="mb-8 flex items-center space-x-8">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="viewMode"
            value="member"
            checked={viewMode === 'member'}
            onChange={() => setViewMode('member')}
            className="form-radio"
          />
          <span>인원별</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="viewMode"
            value="period"
            checked={viewMode === 'period'}
            onChange={() => setViewMode('period')}
            className="form-radio"
          />
          <span>기간별</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
        {viewMode === 'member' ? (
          <div className="w-[400px] h-[420px] mx-auto">
            <h2 className="text-xl font-semibold mb-3">📊 선교팀 인원수</h2>
<MissionTeamMemberPieChart
  data={memberData.map(d => ({
    ...d,
    period_start: d.period_start ?? '',
    period_end: d.period_end ?? '',
    member_count: d.value
  }))}
/>
          </div>
        ) : (
          <div className="w-[400px] h-[420px] mx-auto">
            <h2 className="text-xl font-semibold mb-3">📊 선교 기간 (일수)</h2>
            <MissionTeamPeriodPieChart data={periodData} />
          </div>
        )}
      </div>
    </div>
  )
}



// 'use client'

// import { useState, useEffect, useMemo } from 'react'
// import dynamic from 'next/dynamic'
// import type { DataEntry as PeriodDataEntry } from '@/components/MissionTeamPeriodPieChart'

// // 👉 인원수 데이터 타입 정의
// type MemberDataEntry = {
//   name: string
//   value: number
// }

// // 차트 컴포넌트 동적 로드
// const MissionTeamMemberPieChart = dynamic(
//   () => import('@/components/MissionTeamMemberPieChart'),
//   { ssr: false }
// )

// const MissionTeamPeriodPieChart = dynamic(
//   () => import('@/components/MissionTeamPeriodPieChart'),
//   { ssr: false }
// )

// export default function Page() {
//   const baseYear = useMemo(() => {
//     const now = new Date()
//     const month = now.getMonth() + 1
//     const year = now.getFullYear()
//     return month < 10 ? year - 1 : year
//   }, [])

//   const [year, setYear] = useState(baseYear)

//   // 👉 인원수 차트 데이터
//   const [memberData, setMemberData] = useState<MemberDataEntry[]>([])
//   // 👉 기간 차트 데이터 (PeriodDataEntry로 정확하게 선언)
//   const [periodData, setPeriodData] = useState<PeriodDataEntry[]>([])

//   // 인원수 데이터 fetch
//   useEffect(() => {
//     async function fetchMemberData() {
//       try {
//         const res = await fetch(`/api/mission-team-member?year=${year}`)
//         if (!res.ok) throw new Error('Failed to fetch member data')
//         const json = await res.json()
//         setMemberData(json)
//       } catch (error) {
//         console.error(error)
//         setMemberData([])
//       }
//     }
//     fetchMemberData()
//   }, [year])

//   // 기간 데이터 fetch
//   useEffect(() => {
//     async function fetchPeriodData() {
//       try {
//         const res = await fetch(`/api/mission-team-period?year=${year}`)
//         if (!res.ok) throw new Error('Failed to fetch period data')
//         const json = await res.json()
//         setPeriodData(json)
//       } catch (error) {
//         console.error(error)
//         setPeriodData([])
//       }
//     }
//     fetchPeriodData()
//   }, [year])

//   return (
//   <div className="p-6 max-w-6xl mx-auto">
    
//         <h1 className="text-2xl font-bold mb-9   ">
//          {year}년 선교팀 분석</h1>

//     {/* 년도 선택 */}
//     <select
//       value={year}
//       onChange={(e) => setYear(Number(e.target.value))}
//       className="border p-2 mb-8 w-full max-w-xs"
//     >
//       {[2022, 2023, 2024, 2025].map((y) => (
//         <option key={y} value={y}>
//           {y}년
//         </option>
//       ))}
//     </select>

//     {/* 차트 2개 옆으로 배치 */}
//     <div className="flex flex-wrap gap-8 justify-center">
//       {/* 인원수 차트 */}
//       <div className="flex-1 min-w-[400px] max-w-[500px]">
//         <h2 className="text-xl font-semibold mb-2">📊
//              선교팀 인원수</h2>
//         <MissionTeamMemberPieChart data={memberData} />
//       </div>

//       {/* 선교 기간 차트 */}
//       <div className="flex-1 min-w-[400px] max-w-[500px]">
//         <h2 className="text-xl font-semibold mb-2">📊 선교 기간 (일수)</h2>
//         <MissionTeamPeriodPieChart data={periodData} />
//       </div>
//     </div>
//   </div>
// )

// }
