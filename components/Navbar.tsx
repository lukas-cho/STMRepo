"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "AI Test All", href: "/ai/all-ai-test" },
    { label: "Menu List", href: "/menu-list" },
    { label: "새로운 메뉴 등록", href: "/newmenu-create" },
    { label: "새로운 미션팀 등록", href: "/newmission-team-create" },
    { label: "팀별 판매 정보 입력", href: "/mission-team-menu-add" },
    { label: "판매 현황 분석 조회", href: "/mission-team-menu-analysis" },
  ];

  return (
    <nav className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-800 to-blue-400 text-white shadow-lg flex-col justify-between">
      {/* 로고 + 메뉴 */}
      <div className="flex flex-col items-center pt-8">
        {/* 로고 */}
        <div className="bg-[#87CEEB] p-3 rounded-xl mb-6 shadow">
          <Image
            src="/bottom-kcpc-logo.png"
            alt="Dog breeds banner"
            width={220}
            height={70}
          />
        </div>

        {/* 메뉴 */}
        <div className="w-full flex flex-col space-y-6 px-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 transition-all duration-200 ease-in-out text-xl ${
                pathname === item.href
                  ? "font-bold underline text-sky-200"
                  : "text-white hover:text-sky-200"
              }`}
            >
              <span className="text-white text-xl">✓</span> {/* 하얀색 체크 */}
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Auth 버튼 */}
      <div className="p-6">
        <AuthButton />
      </div>
    </nav>
  );
}
