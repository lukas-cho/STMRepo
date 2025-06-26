'use client'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'  // 여기서 useMemo 임포트 추가
// dynamic import로 클라이언트에서만 로드
const MissionTeamSalesAmountChart = dynamic(() => import("@/components/MissionTeamSalesAmountChart"), { ssr: false });
const MissionTeamSalesChart = dynamic(() => import("@/components/MissionTeamSalesChart"), { ssr: false });
const MissionTeamProfitChart = dynamic(() => import('@/components/MissionTeamProfitChart'), { ssr: false })

export default function HomePage() {
    // 오늘 날짜 기준 연도 계산 (10월 이전이면 작년, 10월 이상이면 올해)
  const year = useMemo(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const currentYear = now.getFullYear()
    return month < 10 ? currentYear - 1 : currentYear
  }, [])

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-6xl mx-auto px-2 py-10 text-center">
      
      </section>
    </main>
  )
}
