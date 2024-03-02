'use client'

import { NextPage } from "next";

interface MenuItemProps {
    onClick: () => void
    label: string
}

const MenuItem: NextPage<MenuItemProps> = ({onClick, label}) => {
    return ( <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-1 transition font-semibold">
        {label}
    </div> );
}

export default MenuItem;