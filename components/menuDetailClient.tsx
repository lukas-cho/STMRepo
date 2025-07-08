'use client';

import { useState, useEffect } from "react";
import IngredientSectionComponent from "./ingredientSectionComponent";
import SalesQuantityGraphs from "./salesQuantityGraphs";
import DetailedSalesChart, { DetailedSales } from "@/components/detailedSalesChart";
import DetailedSalesTable from "@/components/detailedSalesTable";


const tabs = [
    { label: '역대 판매 기록', id: 'sales' },
    { label: '재료 및 준비물', id: 'ingredients' },
    { label: '조리 방법 및 설명', id: 'instructions' },
    { label: '조리 영상 및 힌트', id: 'video' },
];


type SalesData = {
  year: number;
  sales: number;
  cost: number;
  margin: number;
};

type QuantityData = {
  year: number;
  sold: number;
  available: number;
  remaining: number;
};


function toEmbedUrl(url: string): string {
  try {
    const parseUrl = new URL(url);
    let videoId = "";

    if (parseUrl.hostname.includes("youtu.be")) {
      videoId = parseUrl.pathname.slice(1);
    } else if (parseUrl.hostname.includes("youtube.com")) {
      const params = new URLSearchParams(parseUrl.search);
      videoId = parseUrl.searchParams.get("v") || "";
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`; // 유효한 YouTube URL이 아니면 원본 URL 반환
    }

     return url;
  } catch {
        // url 파싱 실패 시 원본 반환
        return url;

  }

}

export default function MenuDetailClient({
  menu,
  salesData,
  quantityData,
  detailedSalesData,
}: {
  menu: any;
  salesData: SalesData[];
  quantityData: QuantityData[];
  detailedSalesData: DetailedSales[];
}) {
    const [activeTab, setActiveTab] = useState(tabs[0].id)

    useEffect(() => {
      function onScroll() {
        const offset = 150;
        const threshold = 80;
        const scrollPosition = window.scrollY + offset;

        const scrollBottom = window.scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        let currentId = tabs[0].id;

        if (docHeight - scrollBottom < 100) {
          currentId = tabs[tabs.length - 1].id;
        } else {
          for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            const section = document.getElementById(tab.id);
            if (!section) continue;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop - threshold &&
              scrollPosition < sectionTop + sectionHeight - threshold
            ) {
              currentId = tab.id;
              break;
            }
          }
        }

  setActiveTab(currentId);
}

      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      }
    }, [])


return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-center scroll-smooth">
      <div className="sticky top-0 bg-white z-10 py-4 shadow-md">
          <div className="flex flex-wrap gap-3 justify-center">
              {tabs.map((tab) => (
                  <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  className={
                    `px-5 py-2 rounded-full border font-semibold shadow-sm transition ` +
                    (activeTab === tab.id
                      ? "bg-indigo-600 text-white border" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-300 border-gray-300")
                  }
                  >
                    {tab.label}
                  </a>
              ))}
          </div>
      </div>


      <div className="mt-10 text-left">
          <section id="sales" className="scroll-mt-28 mb-28">
            <h2 className="text-2xl font-bold mb-6 text-center">역대 판매 기록</h2>
            <SalesQuantityGraphs salesData={salesData} quantityData={quantityData} />
            <div className="mt-10">
              {/* <h3 className="text-xl font-semibold mb-6 text-center">상세 판매 및 수익 분석</h3> */}
              <DetailedSalesChart data={detailedSalesData} />
              <div className="mt-8 overflow-x-auto">
                <DetailedSalesTable data={detailedSalesData} />
              </div>
            </div>
          </section>
          

          <section id="ingredients" className="scroll-mt-28 mb-28">
            <h2 className="text-2xl font-bold mb-6 text-center">재료 및 준비물</h2> 
            {menu.serving_size && (
              <p className="text-center text-gray-500 text-sm mb-6">
                ({menu.serving_size}인분)
              </p>
            )}
            <IngredientSectionComponent ingredientText={menu.menu_ingredient || ''}/>
          </section>

        <section id="instructions" className="scroll-mt-28 mb-28">
          <h2 className="text-2xl font-bold mb-6 text-center">조리 방법 및 설명</h2>
          {menu.menu_instruction ? (
            <div className="space-y-6">
              {(menu.menu_instruction ?? "")
                .split(/\n+/)
                .map((step: string) => step.trim())
                .filter((step: string) => step.length > 0)
                .map((step: string, index: number) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 items-start bg-gray-50 p-4 rounded-xl shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center">
                          {index + 1}
                        </div>
                        <p className="font-semibold text-gray-800">Step {index + 1}</p>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{step}</p>
                    </div>
                    <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      이미지 준비 중
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p>설명 없음 (필드 추가 필요)</p>
          )}
        </section>

        <section id="video" className="scroll-mt-28 mb-28">
          <h2 className="text-2xl font-bold mb-6 text-center">조리 영상 및 힌트</h2>
          {menu.menu_url && menu.menu_url.trim() !== "" ? (
            <iframe
              src={toEmbedUrl (menu.menu_url)}
              className="w-full h-110 shadow"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p>영상 링크 없음 (필드 추가 필요)</p>
          )}
        </section>

      </div>
    </div>
)
}



// 'use client';


// import { useState } from "react";
// import IngredientSectionComponent from "./ingredientSectionComponent";
// import SalesQuantityGraphs from "./salesQuantityGraphs";

// const tabs = [
//     '역대 판매 기록',
//     '재료 및 준비물',
//     '조리 방법 및 설명',
//     '조리 영상 및 힌트',
// ];


// type SalesData = {
//   year: number;
//   sales: number;
//   cost: number;
//   margin: number;
// };

// type QuantityData = {
//   year: number;
//   sold: number;
//   available: number;
//   remaining: number;
// };

// export default function MenuDetailClient({
//   menu,
//   salesData,
//   quantityData,
// }: {
//   menu: any;
//   salesData: SalesData[];
//   quantityData: QuantityData[];
// }) {
//     const [selectedTab, setSelectedTab] = useState(tabs[0]);



// return (
//     <div className="max-w-4xl mx-auto py-10 px-4 text-center">
//       <div className="mt-10">
//           <div className="flex flex-wrap gap-3 justify-center">
//               {tabs.map((tab) => (
//                   <button
//                       key={tab}
//                       onClick={() => setSelectedTab(tab)}
//                       className={`px-5 py-2 rounded-full border font-semibold shadow-sm transition ${
//                           selectedTab === tab
//                               ? 'bg-blue-600 text-white'
//                               : 'bg-gray-100 text-gray-800 hover:bg-gray-300'
//                           }`}
//                   >
//                       {tab}
//                   </button>
//               ))}
//           </div>
//       </div>


//       <div className="mt-10 bg-white p-6 rounded-2xl shadow-md text-left">
//           {selectedTab === '역대 판매 기록' && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-6 text-center">역대 판매 기록</h2>
//                 <div>
//                   <SalesQuantityGraphs salesData={salesData} quantityData={quantityData} />
//                 </div>
//               </div>
//           )}

//           {selectedTab === '재료 및 준비물' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-center">재료 및 준비물</h2>
//             <IngredientSectionComponent ingredientText={menu.menu_ingredient || ''}/>
//           </div>
//         )}

//         {selectedTab === '조리 방법 및 설명' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-center">조리 방법 및 설명</h2>
            
//             {menu.menu_instruction ? (
//               <div className="space-y-6">
//                 {(menu.menu_instruction ?? "")
//                   .split(/\n+/) // 여러 줄바꿈 기준으로 분리
//                   .map((step: string) => step.trim()) // 공백 제거
//                   .filter((step: string) => step.length > 0) // 빈 줄 제거
//                   .map((step: string, index: number) => (
//                     <div key={index} className="flex flex-col md:flex-row gap-4 items-start bg-gray-50 p-4 rounded-xl shadow">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center">
//                             {index + 1}
//                           </div>
//                           <p className="font-semibold text-gray-800">Step {index + 1}</p>
//                         </div>
//                         <p className="text-gray-700 whitespace-pre-line">{step}</p>
//                       </div>
//                       <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                         이미지 준비 중
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             ) : (
//               <p>설명 없음 (필드 추가 필요)</p>
//             )}
//           </div>
//         )}

//         {selectedTab === '조리 영상 및 힌트' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-center">조리 영상 및 힌트</h2>
//             {menu.video_url ? (
//               <iframe
//                 src={menu.video_url}
//                 className="w-full h-64"
//                 allowFullScreen
//               />
//             ) : (
//               <p>영상 링크 없음 (필드 추가 필요)</p>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
// )
// }