"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";

export type DetailedSales = {
  year: number;
  unitPrice: number;
  cost: number;
  quantitySold: number;
  sales: number;
  profitMarginPercent: number;
};

export default function DetailedSalesChart({ data }: { data: DetailedSales[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Bar yAxisId="left" dataKey="quantitySold" name="판매량" fill="#8884d8" />
        <Bar yAxisId="left" dataKey="sales" name="매출" fill="#82ca9d" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="profitMarginPercent"
          name="마진률(%)"
          stroke="#ff7300"
          activeDot={{ r: 8 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}