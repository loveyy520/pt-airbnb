import getCurrentUser from "../actions/getCurrentUser"
import { getReservations } from "../actions/getReservations"
import EmptyState from "../components/empty-state"
import TripsClient from "./trips-client"


const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login" />
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (!reservations.length) {
        return <EmptyState
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips." />
    }


    return <TripsClient
        reservations={reservations}
        currentUser={currentUser} />
}

export default TripsPage