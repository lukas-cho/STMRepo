"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const invoices = [
  {
    invoice: "아프리카",
    paymentStatus: "선교중",
    totalAmount: "5",
    paymentMethod: "아프리카 콩고 선교",
  },
  {
    invoice: "중남미",
    paymentStatus: "선교준비",
    totalAmount: "10",
    paymentMethod: "중남미 혼두라스",
  },
  {
    invoice: "아시아",
    paymentStatus: "선교중",
    totalAmount: "20",
    paymentMethod: "일본",
  },
  {
    invoice: "북미",
    paymentStatus: "선교중",
    totalAmount: "30",
    paymentMethod: "북미 뉴욕",
  },
  {
    invoice: "중아시아",
    paymentStatus: "선교마침",
    totalAmount: "4",
    paymentMethod: "싱가포르",
  },
  {
    invoice: "동남아",
    paymentStatus: "선교마침",
    totalAmount: "1",
    paymentMethod: "필리핀",
  },
  {
    invoice: "유럽",
    paymentStatus: "선교마침",
    totalAmount: "25",
    paymentMethod: "독일",
  },
];

export function TableDemo() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>최근 단기 선교팀 리스트</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">2025년도 단기선교</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Table>
          <TableCaption>함께 기도로 동참해주세요.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">선교코드</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>선교 지역</TableHead>
              <TableHead className="text-right">참가인원수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>총 참가인원수</TableCell>
              <TableCell className="text-right">120</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
