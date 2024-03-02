'use client'

import { Category } from "@/types";
import { NextPage } from "next";

interface ListingCategoryProps extends Category {}

const ListingCategory: NextPage<ListingCategoryProps> = ({
    icon,
    iconColor,
    label,
    description
}) => {
    return ( <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
            <i className={`${icon} ${iconColor} text-10 text-neutral-6`}></i>
            <div className="flex flex-col">
                <div className="text-lg font-semibold">
                    {label}
                </div>
                <div className="text-neutral-5 font-light">
                    {description}
                </div>
            </div>
        </div>
    </div> );
}
 
export default ListingCategory;