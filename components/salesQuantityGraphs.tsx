'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

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

// 실제 데이터 fetch 로직 필요
// const salesData: SalesData[] = [
//   { year: 2022, sales: 10000, cost: 4000, margin: 6000 },
//   { year: 2023, sales: 15000, cost: 7000, margin: 8000 },
// ];

// const quantityData: QuantityData[] = [
//   { year: 2022, sold: 200, available: 250, remaining: 50 },
//   { year: 2023, sold: 300, available: 350, remaining: 50 },
// ];

export default function SalesQuantityGraphs({
  salesData,
  quantityData,
}: {
  salesData: SalesData[];
  quantityData: QuantityData[];
}) {

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* 매출, 재료비, 마진 */}
      <div className="flex-grow min-w-0 p-4 bg-gray-50 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-center">연도별 매출, 재료비, 마진</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={salesData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barCategoryGap={20}  
            barGap={0}           
          >
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value.toLocaleString()}`, name]}
            />
            <Legend />
            <Bar
              dataKey="cost"
              stackId="costmargin"
              fill="#f87171"
              name="재료비"
              barSize={30}
              radius={[0, 0, 0, 0]} 
            />
            <Bar
              dataKey="margin"
              stackId="costmargin"
              fill="#4ade80"
              name="마진"
              barSize={30}
              radius={[0, 0, 0, 0]} 
            />
          
            <Bar
              dataKey="sales"
              stackId="sales"
              fill="#60a5fa"
              name="매출"
              barSize={5}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 판매량, 만든 갯수, 남은 갯수 */}
      <div className="flex-grow min-w-0 p-4 bg-gray-50 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-center">연도별 판매량, 생산량, 재고</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={quantityData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }} 
            barCategoryGap={20}
            barGap={0}
          >
             <XAxis dataKey="year" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [`${value.toLocaleString()}개`, name]}
            />
            <Legend />

           
            <Bar
              dataKey="remaining"
              stackId="costmargin"
              fill="#f87171"
              name="재고"
              barSize={30}
              radius={[0, 0, 0, 0]}  
            />
         
            <Bar
              dataKey="sold"
              stackId="costmargin"
              fill="#4ade80"
              name="판매량"
              barSize={30}
              radius={[0, 0, 0, 0]}  
            />

         
            <Bar
              dataKey="available"
              stackId="sales"
              fill="#60a5fa"
              name="생산량"
              barSize={5}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
  
    </div>
  );
}