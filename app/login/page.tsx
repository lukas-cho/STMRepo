"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, FormEvent, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {data: session} = useSession();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.ok) {
            router.push("/my-page");
        } else {
            setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
    }

    useEffect(() => {
        if (session)
            router.push("/my-page");
    }, [session])

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">로그인</h1>
            <form onSubmit={handleLogin}>
                <label className="block mb-2">
                    이메일:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <label className="block mb-2">
                    비밀번호:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 cursor-pointer">
                    로그인
                </button>
            </form>
            <p className="mt-4">
                Don't have an account?{" "}
                <button
                    onClick={() => router.push("/signup")}
                    className="underline text-blue-600 cursor-pointer"
                >
                    Sign up
                </button>
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                type="button"
                onClick={() => signIn("google")}
                className="bg-red-500 text-white px-4 py-2 mt-4 w-full cursor-pointer"
            >
                Sign in with Google
            </button>
        </div>
    )
}