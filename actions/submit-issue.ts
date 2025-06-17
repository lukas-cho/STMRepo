'use server';

import { IssueSchema } from "@/lib/zod-schema";
import { prisma } from "@/lib/prismaClient";

export type ActionResult = { success: true; errors: null; } | { success: false; errors: Record<string, string[]>; };

export async function submitIssue(
    prevState: ActionResult,
    formData: FormData
): Promise<ActionResult> {
    const raw = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        description: formData.get("description"),
    };

    const result = IssueSchema.safeParse(raw);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        }
    }

    await prisma.issue.create({
        data: result.data
    })

    return {
        success: true,
        errors: null,
    }
}