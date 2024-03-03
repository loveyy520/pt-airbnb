'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import { NextPage } from "next";

const Search: NextPage = () => {
    const searchModal = useSearchModal()


    return <div
        onClick={searchModal.onOpen}
        className="py-2 rounded-full transition cursor-pointer"
        w="full md:auto"
        b="1 solid neutral-1"
        shadow="sm hover:md">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    Anywhere
                </div>
                <div className="hidden sm:block font-semibold px-6 b-x-1 flex-1" text="sm center">
                    Any week
                </div>
                <div
                    className="flex flex-row items-center gap-3"
                    text="sm gray-6"
                    p="l-6 r-2">
                    <div className="hidden sm:block">
                        Add Guests
                    </div>
                    <div className="p-2 bg-rose-5 rounded-full text-white">
                        <i className="i-carbon-search"></i>
                    </div>
                </div>
            </div>
    </div>
}

export default Search