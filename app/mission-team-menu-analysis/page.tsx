'use client'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

const MissionTeamSalesAmountChart = dynamic(() => import("@/components/MissionTeamSalesAmountChart"), { ssr: false });
const MissionTeamSalesChart = dynamic(() => import("@/components/MissionTeamSalesChart"), { ssr: false });
const MissionTeamProfitChart = dynamic(() => import('@/components/MissionTeamProfitChart'), { ssr: false })

export default function HomePage() {
  const year = useMemo(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const currentYear = now.getFullYear()
    return month < 10 ? currentYear - 1 : currentYear
  }, [])

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-screen-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-10">
          {year}년 판매 현황 분석 조회
        </h1>

        {[MissionTeamSalesAmountChart, MissionTeamSalesChart, MissionTeamProfitChart].map((ChartComp, idx) => (
          <div
            key={idx}
            className="mx-auto my-8 w-full max-w-screen-xl bg-white rounded-xl shadow relative p-4"
            style={{ minWidth: 900 }}
          >
            <ChartComp year={year} />
          </div>
        ))}
      </section>
    </main>
  )
}
