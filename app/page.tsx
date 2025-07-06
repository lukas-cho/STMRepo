"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react"; // 여기서 useMemo 임포트 추가
import { SectionCards } from "@/components/section-cards";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-white py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            단기선교 바자회 노하우 공유 플랫폼
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            이 플랫폼은 단기선교 바자회에 참여하는 선교팀들이 판매 메뉴와 판매
            현황을 공유·분석하여 다음 바자회를 준비하는 데 도움이 되도록 만든
            공간입니다.
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            선교 바자회를 위한 아이디어와 노하우를 이곳에서 찾아보세요.
          </p>
          <div className="mt-8">
            <a
              href="#start"
              className="inline-block bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
            >
              역대 메뉴 보기
            </a>
          </div>
        </div>
        <img
          src="/screenshot.png"
          className="mx-auto mt-6 w-full -48 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
        <iframe
          className="mt-6 w-full h-64 md:h-96 rounded-lg shadow-lg"
          src="https://youtube.com/embed/jT2J-zpf_CM"
        ></iframe>
      </section>
    </main>
  );
}
