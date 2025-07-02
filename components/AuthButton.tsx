"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return null;

    if (!session) {
        return (
            <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
                Log in
            </button>
        );
    }

    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
        >
            Log out
        </button>
    );
}