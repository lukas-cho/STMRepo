"use server";

import { prisma } from "@/lib/prismaClient";

export async function signUpProfileToDB({
                                            id,
                                            name,
                                            phone,
                                        }: {
    id: string;
    name: string;
    phone: string;
}): Promise<{ success: boolean }> {
    try {
      
    } catch (error) {
        console.error("Failed to insert profile:", error);
        return { success: false };
    }
}