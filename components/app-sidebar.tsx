"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartNoAxesCombined,
  Command,
  Frame,
  GalleryVerticalEnd,
  House,
  Map,
  PieChart,
  Utensils,
  ChartPie,
  HelpCircle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "홍길동",
    email: "hong.gildong@kcpc.org",
    avatar: "/theSent.jpg",
  },
  teams: [
    {
      name: "컴패션",
      logo: GalleryVerticalEnd,
      plan: "혼두라스",
    },
    {
      name: "도시선교",
      logo: AudioWaveform,
      plan: "뉴욕",
    },
    {
      name: "캐리비안 선교",
      logo: Command,
      plan: "도미니카",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
      isActive: true,
      items: [],
    },
    {
      title: "전체 바자회 메뉴",
      url: "/menu-list",
      icon: Utensils,
      items: [],
    },
    {
      title: "새로운 등록",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "새로운 메뉴 등록",
          url: "/newmenu-create",
        },
        {
          title: "새로운 선교팀 등록",
          url: "/newmission-team-create",
        },
        {
          title: "팀별 판매 메뉴 및 매출 정보 입력",
          url: "/mission-team-menu-add",
        },
        {
          title: "AI 입력 도우미",
          url: "/ai/all-ai-test",
        },
      ],
    },
    {
      title: "선교 자료 분석 조회",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "선교팀 분석 자료",
          url: "/mission-team-analysis",
        },
        {
          title: "바자회 메뉴 분석 자료",
          url: "/mission-team-menu-analysis",
        },
      ],
    },
    {
      title: "AI 검색",
      url: "/ai-search",
      icon: Bot,
      items: [],
    },
    {
      title: "문의 하기",
      url: "/contact",
      icon: HelpCircle,
      items: [],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/ai/all-ai-test",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// <NavMain items={data.navMain} />
// <NavProjects projects={data.projects} />
