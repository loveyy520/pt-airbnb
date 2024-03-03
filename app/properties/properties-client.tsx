'use client'

import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/listing-card";

interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser: SafeUser
}

const PropertiesClient: NextPage<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()

    const [deletingId, setDeletingId] = useState<string>()

    const onCancel = useCallback(async (id: string) => {
        try {
            setDeletingId(id)
            await axios.delete(`/api/listings/${id}`)
            toast.success('Listing deleted!')
            router.refresh()
        } catch(e: any) {
            toast.error(e?.response?.data?.error ?? 'Failed to delete listing, please try again.')
        } finally {
            setDeletingId('')
        }
    }, [router])

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties."
            />
            <div
                className="
                    mt-10
                    grid
                    gap-8
                "
                grid-cols="1 sm:2 md:3 lg:4 xl:5 2xl:6">
                {listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={listing.id === deletingId}
                        actionLabel="Delete property"
                        currentUser={currentUser} />
                ))}
            </div>
        </Container>
    );
}
 
export default PropertiesClient;