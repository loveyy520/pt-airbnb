import getCurrentUser from "./actions/getCurrentUser"
import getListings from "./actions/getListings"
import Container from "./components/container"
import EmptyState from "./components/empty-state"
import ListingCard from "./components/listings/listing-card"

import { IListingsParams } from '@/types'
interface HomeProps {
  searchParams: IListingsParams
}
/* index.tsx */
const Home = async({ searchParams }: HomeProps) => {
  
  // const listings: any = []
  const currentUser = await getCurrentUser()

  const listingParams = { ...searchParams }
  if (searchParams.userId) {
    listingParams.userId = currentUser?.id
  }
  const listings = await getListings(listingParams)

  if (!listings?.length) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div className="
        grid
        gap-8
      "
      grid-cols="1 sm:2 md:3 lg:4 xl:5 2xl:6">
        {
          listings.map(listing => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser} />
          ))
        }
      </div>
    </Container>
  )
}

export default Home