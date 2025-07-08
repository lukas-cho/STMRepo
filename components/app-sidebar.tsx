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
  Settings2,
  SquareTerminal,
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
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "전체 메뉴",
          url: "menu-list",
        },
        {
          title: "전체 선교팀",
          url: "/",
        },
      ],
    },
    {
      title: "AI 입력 도우미",
      url: "/ai",
      icon: Bot,
      items: [
        {
          title: "음성 입력",
          url: "/all-ai-test",
        },
        {
          title: "사진 입력",
          url: "/all-ai-test",
        },
        {
          title: "영상 입력",
          url: "/all-ai-test",
        },
      ],
    },
    {
      title: "판매현황 분석조회",
      url: "/",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "선교팀별 판매현황",
          url: "mission-team-menu-analysis",
        },
        {
          title: "메뉴별 판매현황 등록",
          url: "mission-team-menu-analysis",
        },
        {
          title: "년도별 판매현황 등록",
          url: "mission-team-menu-analysis",
        },
      ],
    },

    {
      title: "새로운 등록",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "새로운 메뉴 등록",
          url: "newmenu-create",
        },
        {
          title: "새로운 선교팀 등록",
          url: "newmission-team-create",
        },
        {
          title: "팀별 판매 메뉴 및 매출 정보 입력",
          url: "mission-team-menu-add",
        },
      ],
    },
    {
      title: "선교 자료 분석 조회",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "선교팀 분석 자료",
          url: "mission-team-menu-analysis",
        },
        {
          title: "바자회 메뉴 분석 자료",
          url: "mission-team-menu-analysis",
        },
      ],
    },
    {
      title: "AI 검색",
      url: "#",
      icon: Settings2,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
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
