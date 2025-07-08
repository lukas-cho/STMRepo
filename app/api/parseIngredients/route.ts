import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // .env에 설정해둔 API 키

export async function POST(request: Request) {
  try {
    const { ingredientText } = await request.json();

    if (!ingredientText) {
      return NextResponse.json({ success: false, error: 'ingredientText가 필요합니다' });
    }

    // 1) 프롬프트 생성
    const prompt = `
아래 재료 텍스트를 JSON 배열로 재료명(name)과 수량(quantity)으로 분리해서 출력해줘:
"${ingredientText}"

결과 예시:
[
  {"name": "아보카도", "quantity": "30개"},
  {"name": "밥", "quantity": "40공기"},
  {"name": "김", "quantity": "50장"}
]
`;

    // 2) Google Gemini API 호출 (REST API 예시)
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: {
          text: prompt,
        },
        temperature: 0,
        maxTokens: 300,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ success: false, error: `AI 호출 실패: ${error}` });
    }

    const json = await res.json();

    // 3) AI 응답 텍스트 추출
    const outputText = json?.candidates?.[0]?.output ?? '';

    if (!outputText) {
      return NextResponse.json({ success: false, error: 'AI 응답이 없습니다.' });
    }

    // 4) JSON 파싱
    const parsed = JSON.parse(outputText);

    return NextResponse.json({ success: true, ingredients: parsed });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}