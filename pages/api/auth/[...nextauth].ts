import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient"
import {NextAuthOptions} from "next-auth";
import {prisma} from "@/lib/prismaClient";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        // 사용자가 직접 입력하는 로그인 방식
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            // authorize 함수는 email, password를 받아서 supabase에 로그인 요청을 보냄.
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new Error("Please put and email and password.");
                }

                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error || !data.user) {
                    throw new Error(error?.message || "Login Failed.");
                }

                return {
                    id: data.user.id,
                    email: data.user.email,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // 로그인 후 useSession() or getServerSession()을 콜하면 다음 콜백이 실행
    callbacks: {
        async signIn({ user, account }) {
            // When it is Google login
            if (account?.provider === "google") {
                try {
                    const existingProfile = await prisma.profiles.findUnique({
                        where: { id: user.id },
                    });

                    if (!existingProfile) {
                        await prisma.profiles.create({
                            data: {
                                id: user.id,
                                name: user.name || "Unnamed",
                                phone: "",             // 기본값
                                address: "",
                                city: "",
                                state: "",
                                zip: "",
                            },
                        });
                    }
                } catch (error) {
                    console.error("Error creating Google user profile:", error);
                    return false;
                }
            }

            return true; // 로그인 허용
        },
        async session({ session, token }) {
            // session.user에 id도 함께 저장
            if (token?.sub) {
                session.user.id = token.sub;
            }

            // after create profiles table
            const profile = await prisma.profiles.findUnique({
                where: { id: token.sub },
            });
            // after create profiles table
            if (profile) {
                session.user.name = profile.name;
                session.user.phone = profile.phone;
                session.user.address = profile.address;
                session.user.city = profile.city;
                session.user.state = profile.state;
                session.user.zip = profile.zip;
            }

            return session;
        },
    },
    // 세션 데이터를 클라이언트 측의 JWT 토큰에 저장.
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // 커스텀 로그인 페이지 경로
    },
}

export default NextAuth(authOptions);
