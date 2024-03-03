import { getServerSession } from "next-auth";

import prisma from '@/app/libs/prismadb';
import authOptions from "../resource/auth-options";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()
        // 02:34:51
        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        return currentUser
            ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toLocaleString(),
                updatedAt: currentUser.updatedAt.toLocaleString(),
                emailVerified: currentUser.emailVerified?.toLocaleString?.() || null
            } : null
            
    } catch(error: any) {
        return null
    }
}