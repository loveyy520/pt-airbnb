'use client'

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import categories from "@/app/resource/categories";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import Container from "../../components/container";
import ListingHead from "../../components/listings/listing-head";
import ListingInfo from "../../components/listings/listing-info";
import ListingReservation from "../../components/listings/listing-reservation";

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser: SafeUser
    reservations?: SafeReservation[]
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date,
    key: 'selection'
}

const ListingClient: NextPage<ListingClientProps> = ({
    listing,
    currentUser,
    reservations
}) => {
    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations?.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(async() => {
        try {
            if (!currentUser) return loginModal.onOpen()
            
            setIsLoading(true)
    
            await axios.post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id
            })
            toast.success('Listing reserved!')
            setDateRange(initialDateRange)
            router.push('/trips')
            router.refresh()

        } catch(e: any) {
            toast.error(e)
        } finally {
            setIsLoading(false)
        }
    }, [
        currentUser,
        loginModal,
        totalPrice,
        dateRange,
        listing?.id,
        router
    ])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

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
                    <div className="
                        order-first
                        mb-10
                        md:order-last
                        md:col-span-3
                    ">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container> );
}
 
export default ListingClient;