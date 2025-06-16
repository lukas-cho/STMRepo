"use server";

import { prisma } from "@/lib/prismaClient";
import { getAuthSession } from "@/lib/auth";

export async function updateProfileInfo({
                                               phone,
                                               address,
                                               city,
                                               state,
                                               zip,
                                           }: {
    phone: string;
    address: string;
    city: string;
    state: string;
    zip : string;
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
                address,
                city,
                state,
                zip,
            },
        });
console.log({ phone, address, city, state, zip });
        return { success: true };
    } catch (error) {

        console.error("Update profile failed:", error);
        return { success: false, message: "Server error" };
    }
}
