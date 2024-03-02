import { SafeUser } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, type MouseEvent } from "react"
import { toast } from "react-hot-toast"
import useLoginModal from "./useLoginModal"

interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter()
    const loginMadal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])
    
    const toggleFavorite = useCallback(async(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (!currentUser) return loginMadal.onOpen()

        try {
            const method = hasFavorited ? 'delete' : 'post'
            
            await axios[method](`/api/favorites/${listingId}`)
            
            router.refresh()
            toast.success('Success')
        } catch(e) {
            toast.error('Something went wrong.')
        }
    }, [listingId, currentUser, hasFavorited, loginMadal])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite