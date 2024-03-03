'use client'

import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/listing-card";

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser
}

const TripsClient: NextPage<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()

    const [deletingId, setDeletingId] = useState<string>()

    const onCancel = useCallback(async (id: string) => {
        try {
            setDeletingId(id)
            await axios.delete(`/api/reservations/${id}`)
            toast.success('Reservation canceled')
            router.refresh()
        } catch(e: any) {
            toast.error(e?.response?.data?.error ?? 'Failed to cancel reservation, please try again.')
        } finally {
            setDeletingId('')
        }
    }, [router])

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
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
                        onAction={onCancel}
                        disabled={reservation.id === deletingId}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser} />
                ))}
            </div>
        </Container>
    );
}
 
export default TripsClient;