'use client'
import { useState } from "react"

// 임시 데이터
const missionTeams = [
  {
    id: "1",
    country: "Cambodia",
    year: 2025,
    member_count: 12,
    period: "7/10 ~ 7/20",
    description: "Medical & Outreach",
    contact_email: "team1@mission.org"
  },
  {
    id: "2",
    country: "Philippines",
    year: 2024,
    member_count: 8,
    period: "8/15 ~ 8/25",
    description: "Youth Ministry",
    contact_email: "team2@mission.org"
  },
    {
    id: "3",
    country: "Haiti",
    year: 2024,
    member_count: 8,
    period: "8/15 ~ 8/25",
    description: "Youth Ministry",
    contact_email: "team2@mission.org"
  },
]

export default function MissionTeamsPage() {
  const [year, setYear] = useState("2025")

  // 필터링 (year만)
  const filteredTeams = missionTeams.filter(team =>
    team.year.toString() === year
  )

  return (
<main style={{ marginLeft: '18rem' }} className="w-full overflow-x-hidden bg-gray-50">
  {/* 검색 섹션 */}
  <div className="flex flex-wrap gap-4 mb-8 items-center">
    <select
      value={year}
      onChange={e => setYear(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="2025">2025</option>
      <option value="2024">2024</option>
    </select>
  </div>

  {/* 카드 그리드 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredTeams.map(team => (
      <div key={team.id} className="p-5 bg-white rounded-xl shadow min-w-[250px]">
        <h2 className="text-lg font-bold text-blue-700 mb-2">{team.country}</h2>
        <p className="text-gray-700">Year: {team.year}</p>
        <p className="text-gray-700">Members: {team.member_count}</p>
        <p className="text-gray-700">Period: {team.period}</p>
        <p className="text-gray-600 text-sm mt-2">{team.description}</p>
        <p className="text-blue-500 text-sm mt-1">{team.contact_email}</p>
      </div>
    ))}
  </div>
</main>

  )
}
