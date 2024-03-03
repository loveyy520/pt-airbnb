import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListing from "../actions/getFavoriteListing"
import EmptyState from "../components/empty-state"
import FavoritesClient from "./favorites-client"


const ReservationPage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login" />
    }

    const listings = await getFavoriteListing()

    if (!listings?.length) {
        return <EmptyState
            title="No favorites found"
            subtitle="Looks like you have no favorite listings." />
    }

    return <FavoritesClient
        listings={listings}
        currentUser={currentUser} />
}

export default ReservationPage