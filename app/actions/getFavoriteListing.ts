
import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListing() {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return []
    
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds ||[])]
                }
            }
        })
    
        const safeFavorites = favorites.map(fav => ({
            ...fav,
            createdAt: fav.createdAt.toLocaleString()
        }))
    
        return safeFavorites
    } catch(e: any) {
        throw new Error(e)
    }
}