'use client'

import { SafeListing, SafeUser } from "@/types";
import { NextPage } from "next";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/listing-card";


interface FavoritesClientProps {
    currentUser: SafeUser
    listings: SafeListing[]
}

const FavoritesClient: NextPage<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return ( <Container>
        <Heading
            title="Favorites"
            subtitle="List of places you have favorited!" />
        <div
            className="mt-10 grid gap-8"
            grid-cols="1 sm:2 md:3 lg:4 xl:5 2xl:6">
            {listings.map(listing => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser} />
            ))}
        </div>
    </Container> );
}
 
export default FavoritesClient;