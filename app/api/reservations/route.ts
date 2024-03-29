import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
    req: NextRequest
) {
    const currentUser = await getCurrentUser()

    const body = await req.json()

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser!.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}