"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";

export async function getMyProfile() {
    const session = await getAuthSession();

    if (!session?.user?.id) {
        return { loggedIn: false, profile: null };
    }

    const profile = await prisma.profiles.findUnique({
        where: { id: session.user.id },
    });

    return { loggedIn: true, profile };
}
