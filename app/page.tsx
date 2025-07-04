"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react"; // 여기서 useMemo 임포트 추가

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-6xl mx-auto px-2 py-10 text-center">
        단기선교 바자회 노하우 공유 플랫폼
        <div className="mt-6 text-lg text-gray-600">
          이 플랫폼은 단기선교 바자회에 참여하는 선교팀들이
          <br />
          판매 메뉴와 판매 현황을 공유하고, 판매 현황을 분석할 수 있는
          공간입니다.
        </div>
        <iframe
          width="420"
          height="315"
          src="https://youtube.com/embed/jT2J-zpf_CM"
        ></iframe>
      </section>
    </main>
  );
}
