'use client'


import React, { useEffect, useState } from 'react';


// interface Ingredient {
//   name: string;
//   quantity: string;
// }


// export default function IngredientSectionComponent({ ingredientText }: { ingredientText: string }) {
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!ingredientText.trim()) {
//       setIngredients([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     // 1) AI 분석용 API 호출 (Next.js API Route 등)
//     fetch('/api/parseIngredients', {
//       method: 'POST',   // POST로 API 호출한다고 가정
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ingredientText }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setIngredients(data.ingredients);  // { name, quantity }[] 형태 기대
//         } else {
//           setError(data.error || '재료 분석 실패');
//         }
//       })
//       .catch(() => setError('서버 통신 오류'))
//       .finally(() => setLoading(false));
//   }, [ingredientText]);

//   if (loading) return <p>분석 중...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   // 2) AI가 준 배열 그대로 렌더링 (왼쪽/오른쪽 분리 원한다면 별도 로직 추가 가능)

//   // 단순히 2등분해서 좌우 나누기 예시
//   const midpoint = Math.ceil(ingredients.length / 2);
//   const left = ingredients.slice(0, midpoint);
//   const right = ingredients.slice(midpoint);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* 왼쪽 */}
//       <div>
//         <div className="mb-8 bg-white p-6 rounded-xl shadow">
//           <h3 className="text-lg font-semibold mb-4">재료</h3>
//           <ul className="space-y-2">
//             {left.map((item, i) => (
//               <li key={i} className="flex justify-between border-b pb-1">
//                 <span>{item.name}</span>
//                 <span className="text-gray-500 text-sm">{item.quantity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* 오른쪽 */}
//       <div>
//         <div className="mb-8 bg-white p-6 rounded-xl shadow">
//           <h3 className="text-lg font-semibold mb-4">재료</h3>
//           <ul className="space-y-2">
//             {right.map((item, i) => (
//               <li key={i} className="flex justify-between border-b pb-1">
//                 <span>{item.name}</span>
//                 <span className="text-gray-500 text-sm">{item.quantity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


function parseIngredientSections(raw: string) {
    const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

    const sections: { title: string; items: string[] }[] = [];
    let currentSection = { title: '재료', items: [] as string[] };

    for (const line of lines ) {
        const match = line.match(/^\s*[\[\(\{](.+?)[\]\)\}]\s*$/);
        if (match) {
            if (currentSection.items.length > 0) {
                sections.push(currentSection);
            }
            currentSection = { title: match[1], items: [] };
        } else {
            currentSection.items.push(line);
        }
    }
    if (currentSection.items.length > 0) {
        sections.push(currentSection);
    }
    return sections;
}

function parseItemQuantity(item: string): { name: string; quantity: string } {
  const match = item.match(/^(.+?)\s+([\d.,]+(?:[a-zA-Z가-힣]+)?)$/);
  if (match) {
    return { name: match[1], quantity: match[2] };
  } else {
    return { name: item, quantity: '' };
  }
}


function splitSectionsLeftRight(sections: { title: string; items: string[] }[]) {
    if (sections.length === 0) return { left: [], right: [] };

     if (sections.length === 1 && sections[0].title === '재료') {
        const midpoint = Math.ceil(sections[0].items.length / 2);
        const leftSection = { title: sections[0].title, items: sections[0].items.slice(0, midpoint) };
        const rightSection = { title: sections[0].title, items: sections[0].items.slice(midpoint) };

        return { left: [leftSection], right: [rightSection] };
    }

    let maxIndex = 0;
    let maxCount = sections[0].items.length;

    for (let i = 1; i < sections.length; i++) {
        if (sections[i].items.length > maxCount) {
        maxCount = sections[i].items.length;
        maxIndex = i;
        }
    }

    const left = [sections[maxIndex]];
    const right = sections.filter((_, idx) => idx !== maxIndex);

    return { left, right };
}


export default function IngredientSectionComponent({ ingredientText, servingSize, }: { ingredientText: string; servingSize?: number }) {
  const sections = parseIngredientSections(ingredientText);
  const { left, right } = splitSectionsLeftRight(sections);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 왼쪽 섹션들 */}
      <div>
        {left.map((section, idx) => (
          <div key={idx} className="mb-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => {
                const { name, quantity } = parseItemQuantity(item);
                return (
                  <li key={i} className="flex justify-between items-center border-b pb-1">
                    <span>{name}</span>
                    {quantity && <span className="text-gray-500 text-sm">{quantity}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* 오른쪽 섹션들 */}
      <div>
        {right.map((section, idx) => (
          <div key={idx} className="mb-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => {
                const { name, quantity } = parseItemQuantity(item);
                return (
                  <li key={i} className="flex justify-between items-center border-b pb-1">
                    <span>{name}</span>
                    {quantity && <span className="text-gray-500 text-sm">{quantity}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}