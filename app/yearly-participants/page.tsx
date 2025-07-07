"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";
export const description2 = "An area chart with axes";

const chartData2 = [
  { year: "2020", morning: 1860, afternoon: 800 },
  { year: "2021", morning: 3050, afternoon: 1500 },
  { year: "2022", morning: 5670, afternoon: 3000 },
  { year: "2023", morning: 7300, afternoon: 5500 },
  { year: "2024", morning: 9000, afternoon: 7020 },
  { year: "2025", morning: 12000, afternoon: 10000 },
];

const chartConfig2 = {
  morning: {
    label: "오전 참가자 수",
    color: "var(--chart-1)",
  },
  afternoon: {
    label: "오후 참가자 수",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartData = [
  { year: "2020", morning: 1860, afternoon: 800 },
  { year: "2021", morning: 3050, afternoon: 2000 },
  { year: "2022", morning: 2370, afternoon: 1200 },
  { year: "2023", morning: 703, afternoon: 1900 },
  { year: "2024", morning: 2090, afternoon: 1300 },
  { year: "2025", morning: 3140, afternoon: 2400 },
];

const chartConfig = {
  morning: {
    label: "오전 참가자",
    color: "var(--chart-1)",
  },
  afternoon: {
    label: "오후 참가자",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ChartBarStacked() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>연도별 바자회 참가 성도 수</CardTitle>
          <CardDescription>2020 - 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={20}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="morning"
                stackId="a"
                fill="var(--color-morning)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="afternoon"
                stackId="a"
                fill="var(--color-afternoon)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            작년 대비 올해 참가 성도 5.2% 증가{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            AI 분석: 바자회 홍보 강화와 참여 유도 전략이 효과를 봄
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>역대 바자회 누적참가 성도 수</CardTitle>
          <CardDescription>
            2020년부터 2025년까지의 바자회 누적 참가 성도 수를 보여줍니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig2}>
            <AreaChart
              accessibilityLayer
              data={chartData2}
              margin={{
                left: -18,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickCount={5}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="morning"
                type="natural"
                fill="var(--color-morning)"
                fillOpacity={0.7}
                stroke="var(--color-morning)"
                stackId="a"
              />
              <Area
                dataKey="afternoon"
                type="natural"
                fill="var(--color-afternoon)"
                fillOpacity={0.7}
                stroke="var(--color-afternoon)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                2020 - 2025
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
