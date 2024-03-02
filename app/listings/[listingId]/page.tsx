import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/empty-state";
import ListingClient from "@/app/components/listings/listing-client";

interface ListingPageProps {
    listingId: string
}

const ListingPage = async({
    params: { listingId }
}: { params: ListingPageProps }) => {
    const listing = await getListingById(listingId)
    const currentUser = await getCurrentUser()

    if (!listing) return <EmptyState />

    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser} />
    );
}
 
export default ListingPage;