"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

//export const description = "A multiple bar chart";

const chartData = [
  { month: "2020", Morning: 18600, Afternoon: 8000 },
  { month: "2021", Morning: 30500, Afternoon: 20000 },
  { month: "2022", Morning: 23700, Afternoon: 12000 },
  { month: "2023", Morning: 7300, Afternoon: 19000 },
  { month: "2024", Morning: 20900, Afternoon: 13000 },
  { month: "2025", Morning: 21400, Afternoon: 14000 },
];

const chartData2 = [
  { month: "2020", Morning: 26600, Afternoon: 8000 },
  { month: "2021", Morning: 50500, Afternoon: 20000 },
  { month: "2022", Morning: 35700, Afternoon: 12000 },
  { month: "2023", Morning: 26300, Afternoon: 19000 },
  { month: "2024", Morning: 33900, Afternoon: 13000 },
  { month: "2025", Morning: 35400, Afternoon: 14000 },
];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig;

const chartConfig = {
  Morning: {
    label: "Morning",
    color: "var(--chart-1)",
  },
  Afternoon: {
    label: "Afternoon",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export default function ChartBarMultiple() {
  return (
    <div className="flex flex-row">
      <Card>
        <CardHeader>
          <CardTitle>연도별 오전/오후 선교후원금 모금집계</CardTitle>
          <CardDescription>2020 - 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="Morning" fill="var(--color-Morning)" radius={4} />
              <Bar
                dataKey="Afternoon"
                fill="var(--color-Afternoon)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            작년대비 올해 5.2% 상승 <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            최근 5년간 오전 / 오후 선교후원금 모금집계
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>연도별 총 선교 후원금 모금 집계</CardTitle>
          <CardDescription>2020 - 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData2}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 4)}
                hide
              />
              <XAxis dataKey="Morning" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="Morning"
                layout="vertical"
                fill="var(--color-Morning)"
                radius={4}
              >
                <LabelList
                  dataKey="month"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="Morning"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            작년대비 올해 5.2% 상승 <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            최근 5년간 오전 / 오후 선교후원금 모금집계
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
