'use client'

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Search: NextPage = () => {
    const searchModal = useSearchModal()
    const params = useSearchParams()

    const { getByValue } = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue)?.label
        }
        return 'Anywhere'
    }, [locationValue, getByValue])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            let diff = differenceInDays(end, start)

            if (diff === 0) {
                diff = 1
            }

            return `${ diff } Days`
        }

        return 'Any Week'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => guestCount
        ? `${guestCount} Guests`
        : 'Add Guests', [guestCount])


    return <div
        onClick={searchModal.onOpen}
        className="py-2 rounded-full transition cursor-pointer"
        w="full md:auto"
        b="1 solid neutral-1"
        shadow="sm hover:md">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block font-semibold px-6 b-x-1 flex-1" text="sm center">
                    {durationLabel}
                </div>
                <div
                    className="flex flex-row items-center gap-3"
                    text="sm gray-6"
                    p="l-6 r-2">
                    <div className="hidden sm:block">
                        {guestLabel}
                    </div>
                    <div className="p-2 bg-rose-5 rounded-full text-white">
                        <i className="i-carbon-search"></i>
                    </div>
                </div>
            </div>
    </div>
}

export default Search