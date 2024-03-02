'use client'

import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import { NextPage } from "next";
import { useMemo } from "react";

import categories from "@/app/resource/categories";
import Container from "../container";
import ListingHead from "./listing-head";
import ListingInfo from "./listing-info";

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser: SafeUser
    reservations?: Reservation[]
}

const ListingClient: NextPage<ListingClientProps> = ({
    listing,
    currentUser,
    reservations
}) => {
    const category = useMemo(() => {
        return categories.find(cate => cate.label === listing.category)
    }, [listing.category])

    return ( <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser} />
                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid=cols-7
                        md:gap-10
                        mt-6
                    ">
                    <ListingInfo
                        user={listing.user}
                        category={category!}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.guestCount}
                        locationValue={listing.locationValue}
                         />
                </div>
            </div>
        </div>
    </Container> );
}
 
export default ListingClient;