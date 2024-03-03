import { Listing, Reservation, User } from "@prisma/client"

interface Category {
    label: string
    icon: string
    iconColor?: string
    description: string

}
interface IListingsParams {
    userId: string
}

type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
} | null

type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: string
}

type SafeReservation = Omit<
    Reservation,
    'createdAt | startDate | endDate | listing'
> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}

export {
    type Category,
    type IListingsParams,
    type SafeUser,
    type SafeListing,
    type SafeReservation
}
