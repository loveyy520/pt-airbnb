'use client'

import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextPage } from "next/types";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/listing-card";

interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser
}

const ReservationsClient: NextPage<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const oncancel = useCallback(async(id: string) => {
        try {
            setDeletingId(id)
    
            await axios.delete(`/api/reservations/${id}`)
            toast.success('Reservation canceled')
            router.refresh()
        } catch(e: any) {
            toast.error('Something went wrong>')
        } finally {
            setDeletingId('')
        }

    }, [router])

    return ( <Container>
        <Heading
            title="Reservations"
            subtitle="Bookings on your properties." />
            <div
                className="
                    mt-10
                    grid
                    gap-8
                "
                grid-cols="1 sm:2 md:3 lg:4 xl:5 2xl:6">
                {reservations.map(reservation => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={oncancel}
                        disabled={reservation.id === deletingId}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser} />
                ))}
            </div>
    </Container> );
}
 
export default ReservationsClient;