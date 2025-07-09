import {
  IconTrendingDown,
  IconTrendingUp,
  IconUsers,
  IconPackageExport,
  IconRobot,
  IconHeartDollar,
  IconRestore,
} from "@tabler/icons-react";

import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl font-extrabold">
            바자회 후원 성도
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            75,840명
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.7%
            </Badge>
            <IconUsers size={42} strokeWidth={2} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            작년 대비 올해 5.7% 증가{" "}
            <IconTrendingUp className="size-4" color="green" />
          </div>
          <div className="text-muted-foreground">
            AI 분석: 신규 성도와 재참여율 증가
          </div>
          <Link href="/yearly-participants" className="hover:shadow-xl">
            <Button variant="outline" size="sm">
              <ChevronRightIcon />
              자세히 보기
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl">
        <CardHeader>
          <CardDescription className="text-xl font-extrabold">
            바자회 판매 건수
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            20,393건
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -10%
            </Badge>
            <IconPackageExport size={42} strokeWidth={2} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            작년 대비 올해 10% 감소{" "}
            <IconTrendingDown className="size-4" color="red" />
          </div>
          <div className="text-muted-foreground">
            AI 분석: 재료비 상승과 판매 전략 미비
          </div>
          <Link href="" className="hover:shadow-xl">
            <Button variant="outline" size="sm">
              <ChevronRightIcon />
              자세히 보기
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl font-extrabold">
            최근 후원 모금액
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $105,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
            <IconHeartDollar size={42} strokeWidth={2} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            작년 대비 올해 12.5% 증가{" "}
            <IconTrendingUp className="size-4" color="green" />
          </div>
          <div className="text-muted-foreground">
            AI 분석: 아이템별 책정 가격 상승
          </div>
          <Link href="/yearly-sales" className="hover:shadow-xl">
            <Button variant="outline" size="sm">
              <ChevronRightIcon />
              자세히 보기
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl font-extrabold">
            재구매 건수
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5040건
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
            <IconRestore size={42} strokeWidth={2} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            아이템별 평균 재구입율 <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">AI 분석: 음식맛 평준화</div>
          <Link href="" className="hover:shadow-xl">
            <Button variant="outline" size="sm">
              <ChevronRightIcon />
              자세히 보기
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
