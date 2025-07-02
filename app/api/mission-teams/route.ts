import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

type MissionTeamCreateInput = {
  country: string | number;
  year: number;
  member_count: number;
  description?: string | null;
  contact_email?: string | null;
  period_start?: string | null;
  period_end?: string | null;
};
export async function GET() {
  // try {
  //   const teams = await prisma.mission_teams.findMany({
  //     include: {
  //       countries: {
  //         select: {
  //           name_ko: true,
  //           name_en: true,
  //         },
  //       },
  //     },
  //   });
  //   return NextResponse.json(teams);
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "Failed to fetch teams" },
  //     { status: 500 }
  //   );
  // }
}
export async function POST(req: Request) {
  // try {
  //   const body: MissionTeamCreateInput = await req.json();
  //   const newTeam = await prisma.mission_teams.create({
  //     data: {
  //       country_id:
  //         typeof body.country === "string"
  //           ? parseInt(body.country)
  //           : body.country,
  //       year: body.year,
  //       member_count: body.member_count,
  //       description: body.description ?? null,
  //       contact_email: body.contact_email ?? null,
  //       period_start: body.period_start ?? null,
  //       period_end: body.period_end ?? null,
  //     },
  //     include: {
  //       countries: {
  //         select: {
  //           name_ko: true,
  //           name_en: true,
  //         },
  //       },
  //     },
  //   });
  //   return NextResponse.json(newTeam, { status: 201 });
  // } catch (error) {
  //   console.error("Failed to create mission team:", error);
  //   return NextResponse.json(
  //     { error: "Failed to create mission team" },
  //     { status: 500 }
  //   );
  // }
}
