"use client";

import { BotMessageSquare } from "lucide-react";
// Update the import paths below to the actual locations of your components:
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AISearch() {
  return (
    <main className="min-h-screen w-full bg-gray-100 text-gray-800">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            인공지능 자연어 검색
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            궁금하신것이 있으신가요? 말하듯 자연스럽게 물어보세요.{" "}
          </p>
        </div>
      </section>
      <section
        id="faq"
        className="w-full max-w-3xl items-center mx-auto px-10 py-10 bg-gray-200 rounded-2xl shadow-lg"
      >
        <div className="justify-center items-center mb-6">
          <BotMessageSquare />
          아래 예제와 같이 복잡한 질문도 자연어로 물어보실 수 있습니다.
          <Input
            type="email"
            placeholder="예상되는 구매 성도님 200명, 예산 $1000로 준비 가능한 메뉴 추천해줘."
            className="bg-gray-100 rounded-md border border-gray-300"
          />
          <br />
          <Input
            type="email"
            placeholder="최근 2년동안 인기 많았던 메뉴는?"
            className="bg-gray-100 rounded-md border border-gray-300"
          />
          <br />
          <Input
            type="email"
            placeholder="준비하는데 투자된 노동력과 예산에 비해 가성비가 좋았던 메뉴는?"
            className="bg-gray-100 rounded-md border border-gray-300"
          />
          <br />
          직접 한번 물어보세요.
          <div className="bg-gray-100 grid w-full gap-3">
            <Label htmlFor="message"></Label>
            <Textarea placeholder="" id="message" />
            <Button>AI 검색하기</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
