import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import EmptyState from "../components/empty-state"
import PropertiesClient from "./properties-client"


const ReservationPage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login" />
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (!listings?.length) {
        return <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties." />
    }

    return <PropertiesClient
        listings={listings}
        currentUser={currentUser} />
}

export default ReservationPage