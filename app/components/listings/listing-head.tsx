'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/types"
import { NextPage } from "next"

import Image from "next/image"
import Heading from "../heading"
import HeartButton from "../heart-button"

interface ListingHeadProps {
    id: string
    title: string
    imageSrc: string
    locationValue: string
    currentUser: SafeUser
}

const ListingHead: NextPage<ListingHeadProps> = ({
    id,
    title,
    imageSrc,
    locationValue,
    currentUser
}) => {
    const { getByValue } = useCountries()

    const location = getByValue(locationValue)

    return ( <>
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`} />
        <div className="w-full h-60vh overflow-hidden rounded-xl relative">
            <Image
                alt="Image"
                src={imageSrc}
                fill
                className="object-cover w-full" />
            <div className="absolute top-5 right-5">
                <HeartButton listingId={id} currentUser={currentUser} />
            </div>
        </div>
    </> );
}
 
export default ListingHead;