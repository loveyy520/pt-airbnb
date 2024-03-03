import prisma from "../libs/prismadb";

import { IListingsParams } from "@/types";

export default async function getListings(params: IListingsParams = {}) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = (params)

        const query: IListingsParams & { NOT?: any } = {}

        if (userId) {
            query.userId = userId
        }
        if (guestCount) {
            query.guestCount = Number(guestCount)
        }
        if (roomCount) {
            query.roomCount = Number(roomCount)
        }
        if (bathroomCount) {
            query.bathroomCount = Number(bathroomCount)
        }
        if (locationValue) {
            query.locationValue = locationValue
        }
        if (category) {
            query.category = category
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
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