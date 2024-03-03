
import prisma from "../libs/prismadb";

interface IParams {
    listingId: string
}

export default async function getListingById({ listingId }: IParams) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })
    
        if (!listing) return null
    
        return {
            ...listing,
            createdAt: listing.createdAt.toLocaleString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toLocaleString(),
                updatedAt: listing.user.updatedAt.toLocaleString(),
                emailVerified:
                    listing.user.emailVerified?.toLocaleString() || null
            }
        }
    } catch(e: any) {
        throw new Error(e)
    }
}