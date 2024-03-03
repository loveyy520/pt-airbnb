import getCurrentUser from "../actions/getCurrentUser"
import { getReservations } from "../actions/getReservations"
import EmptyState from "../components/empty-state"
import ReservationsClient from "./reservations-client"


const ReservationPage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login" />
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (!reservations?.length) {
        return <EmptyState
            title="No reservations found"
            subtitle="Looks like you have no reservations on your properties." />
    }

    return <ReservationsClient
        reservations={reservations}
        currentUser={currentUser} />
}

export default ReservationPage