import prisma from "../libs/prismadb";

import { IListingsParams } from "@/types";

export default async function getListings(params?: IListingsParams) {
    try {
        const query: { userId?: string } = {}

        if (params?.userId) {
            query.userId = params.userId
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const safeListings = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toLocaleString()
        }))
        return safeListings
    } catch(e: any) {
        throw new Error(e)
    }
}