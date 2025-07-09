"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react"; // 여기서 useMemo 임포트 추가
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconMail } from "@tabler/icons-react";
import { TableDemo } from "@/components/recent-mission-trip-table";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            단기선교 (바자회)
            <br />
            노하우 공유 플랫폼
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            이 플랫폼은 단기선교에 참여하고푼 선교팀들이 과거 바자회 판매 메뉴와
            판매 현황을 공유·분석하여 다음 바자회를 준비하는 데 도움이 되도록
            만든 공간입니다. 또한 과거 단기선교팀들의 경험과 노하우를 공유하여
            선교팀들이 더 나은 단기선교를 준비할 수 있도록 돕는 것을 목표로
            합니다.
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            단기 선교를 위한 아이디어와 노하우를 이곳에서 찾아보세요.
          </p>
          <div className="flex justify-center mt-8">
            <div className="mt-8">
              <a
                href="/menu-list"
                className="inline-block bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
              >
                역대 메뉴 보기
              </a>
            </div>
            <div className="mt-8 mx-10"> </div>
            <div className="mt-8">
              <a
                href="#faq"
                className="inline-block bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
              >
                자주묻는 질문{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-2lg w-full flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="px-4 lg:px-6">
                <TableDemo />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-6">
          <iframe
            className="mt-6 w-full h-64 md:h-150 rounded-lg shadow-lg"
            src="https://youtube.com/embed/jT2J-zpf_CM"
          ></iframe>
        </div>
      </section>
      <section
        id="faq"
        className="w-full max-w-4xl items-center mx-auto px-10 py-10 bg-gray-200 rounded-2xl shadow-lg"
      >
        <div className="flex justify-center mb-6">
          <Badge variant="secondary">Your Queries, Simplified!</Badge>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Questions? Answers!
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-6">
          많았던 질문과 그에 대한 대답을 밑에 모아놨습니다. 자주 묻는 질문과
          답변을 확인해 보세요.
        </p>
        <Accordion type="single" collapsible className="w-full" defaultValue="">
          <AccordionItem
            value="item-1"
            className="rounded-xl overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl cursor-pointe"
          >
            <AccordionTrigger className="text-xl bg-gray-100 px-3 py-5">
              단기선교 바자회 Know-How Repository가 뭔가요?
            </AccordionTrigger>
            <AccordionContent className="text-lg flex flex-col gap-4 text-balance bg-gray-100 px-3 py-3">
              <p>
                선교 바자회 앱은 교회에서 과거 바자회에서 판매했던 음식과 간식
                아이디어를 모아두는 웹앱입니다. 재료, 조리법, 영상, 성도 반응뿐
                아니라 과거 판매 실적과 현황도 함께 확인할 수 있어 보다 효과적인
                준비가 가능합니다. 찜한 메뉴 기능으로 선호하는 메뉴를 따로
                저장하고 공유할 수도 있습니다.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="rounded-xl overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl cursor-pointer my-5"
          >
            <AccordionTrigger className="text-xl bg-gray-100 px-3 py-5">
              인공지능을 이용한 자연어 검색을 지원하나요?
            </AccordionTrigger>
            <AccordionContent className="text-lg flex flex-col gap-4 text-balance bg-gray-100 px-3 py-3">
              <p>네, 지원 계획이 있습니다.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="rounded-xl overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl cursor-pointer my-5"
          >
            <AccordionTrigger className="text-xl bg-gray-100 px-3 py-5">
              문의 사항이 있습니다. 어떻게 연락할수 있나요?
            </AccordionTrigger>
            <AccordionContent className="text-lg flex flex-col gap-4 text-balance bg-gray-100 px-3 py-3">
              <p>문의 하기 탭을 눌러보세요.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="rounded-xl overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl cursor-pointer"
          >
            <AccordionTrigger className="text-xl bg-gray-100 px-3 py-5">
              모바일 디바이스도 지원하나요?
            </AccordionTrigger>
            <AccordionContent className="text-lg flex flex-col gap-4 text-balance bg-gray-100 px-3 py-3">
              <p>네, 모바일 디바이스도 지원하고 있습니다.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-center mt-8">
          <IconMail size={28} />
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            문의사항이 있으시면 언제든지 the-sent-mit@kcpc.org로 연락해주세요.
          </p>
        </div>
      </section>
    </main>
  );
}
