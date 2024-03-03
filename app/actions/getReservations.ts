import prisma from "../libs/prismadb"

interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}

interface IQuery {
    listingId?: string
    userId?: string
    listing?: {
        userId: string
    }
}

export async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params
    
        const query: IQuery = {}
    
        if (listingId) {
            query.listingId = listingId
        }
    
        if (userId) {
            query.userId = userId
        }
    
        if (authorId) {
            query.listing = { userId: authorId }
        }
    
        const reservations = await prisma?.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        const safeReservations = reservations?.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toLocaleString(),
            startDate: reservation.startDate.toLocaleString(),
            endDate: reservation.endDate.toLocaleString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toLocaleString()
            }
        }))
        
        return safeReservations
    } catch(e: any) {
        throw new Error(e)
    }
}