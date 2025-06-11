"use server";

import { prisma } from "@/lib/prismaClient";
import { getAuthSession } from "@/lib/auth";

export async function updateProfileInfo({
                                               phone,
                                               street,
                                               city,
                                               state,
                                               zipcode,
                                           }: {
    phone: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
}) {
    const session = await getAuthSession();

    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        await prisma.profiles.update({
            where: { id: session.user.id },
            data: {
                phone,
                street,
                city,
                state,
                zipcode,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Update profile failed:", error);
        return { success: false, message: "Server error" };
    }
}
