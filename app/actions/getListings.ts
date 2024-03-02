import prisma from "../libs/prismadb";

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
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