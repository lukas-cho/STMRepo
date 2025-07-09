import { DetailedSales } from "./detailedSalesChart";

export default function DetailedSalesTable({ data }: { data: DetailedSales[] }) {
  return (
    <table className="min-w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">연도</th>
          <th className="border p-2">판매 단가</th>
          <th className="border p-2">원가</th>
          <th className="border p-2">판매량</th>
          <th className="border p-2">매출</th>
          <th className="border p-2">마진률</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i} className="odd:bg-white even:bg-gray-50 text-center">
            <td className="border p-2">{d.year}</td>
            <td className="border p-2">{d.unitPrice.toFixed(2)}</td>
            <td className="border p-2">{d.cost.toFixed(2)}</td>
            <td className="border p-2">{d.quantitySold}</td>
            <td className="border p-2">{d.sales.toFixed(2)}</td>
            <td className="border p-2">{d.profitMarginPercent.toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}