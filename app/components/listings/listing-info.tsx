'use client'

import useCountries from "@/app/hooks/useCountries";
import { Category, SafeUser } from "@/types";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Avatar from "../avatar";
import ListingCategory from "./listing-category";

const Map = dynamic(() => import('../map'), {
    ssr: false
})

interface ListingInfoProps {
    user: SafeUser
    category: Category
    description: string
    roomCount: number
    guestCount: number
    bathroomCount: number
    locationValue: string
}

const ListingInfo: NextPage<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {
    const { getByValue } = useCountries()

    const coordinates = getByValue(locationValue)?.latlng

    return ( <div className="flex flex-col col-span-4 gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className="
                flex
                flex-row
                items-center
                gap-4
                font-light
                text-neutral-5
            ">
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
                icon={category.icon}
                iconColor={category.iconColor}
                label={category.label}
                description={category.description} />
                )}
            <hr />
            <div className="text-lg font-light text-neutral-5">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
    </div> );
}
 
export default ListingInfo;