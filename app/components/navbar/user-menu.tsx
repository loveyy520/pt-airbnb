'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SaveUser } from "@/types";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import Avatar from "../avatar";
import MenuItem from "./menu-item";

interface UserMenuProps {
    currentUser?: SaveUser
}

const UserMenu: NextPage<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const onRent = useCallback(() => !currentUser
        ? loginModal.onOpen()
        : rentModal.onOpen(),
    [currentUser, loginModal, rentModal])

    return ( <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onRent}
                className="hidden sm:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-1 transition cursor-pointer">
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className="flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                p="4 md:y-1 md:x-2"
                b="1 solid neutral-2">
                <i className="i-material-symbols-light:lists-rounded"></i>
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md bg-white overflow-hidden right-0 top-12 text-sm" w="40vw md:3/4">
                <div className="flex flex-col cursor-pointer">
                    {
                        currentUser
                            ? (<>
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="My trips" />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="My favorites" />
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="My reservations" />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="My properties" />
                                    <MenuItem
                                        onClick={rentModal.onOpen}
                                        label="Airbnb my home" />
                                    <hr b="neutral-50/90" />
                                    <MenuItem
                                        onClick={signOut}
                                        label="Logout" />
                                </>)
                            : (<>
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="Login" />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="Sign up" />
                                </>)
                    }
                </div>
            </div>
        )}
    </div> );
}

export default UserMenu;