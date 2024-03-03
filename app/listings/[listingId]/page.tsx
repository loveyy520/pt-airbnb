import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/getReservations";
import EmptyState from "@/app/components/empty-state";
import ListingClient from "./listing-client";

interface ListingPageProps {
    listingId: string
}

const ListingPage = async({
    params
}: { params: ListingPageProps }) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

    if (!listing) return <EmptyState />

    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations} />
    );
}
 
export default ListingPage;