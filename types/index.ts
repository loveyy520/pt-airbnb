import { Listing, User } from "@prisma/client"

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

interface Category {
    label: string
    icon: string
    iconColor?: string
    description: string

}

export {
    type SafeUser,
    type SafeListing,
    type Category
}
