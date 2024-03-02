'use client'

import { SafeUser } from "@/types";
import { NextPage } from "next";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string
    currentUser: SafeUser
}

const HeartButton: NextPage<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser})
    
    return ( <div
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer"
    >
        <i className="i-material-symbols:favorite-outline-rounded text-7 text-white absolute -top-0.5 -right-0.5"></i>
        <i className={`
            i-material-symbols:favorite-rounded
            text-6
            ${hasFavorited ? 'text-rose-5' : 'text-neutral-500/70'}
        `}></i>

    </div> );
}
 
export default HeartButton;