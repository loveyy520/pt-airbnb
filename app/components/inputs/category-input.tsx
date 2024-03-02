'use client'

import { NextPage } from "next"

interface CategoryInputProps {
    icon: string
    iconColor?: string
    label: string
    selected: boolean
    onClick: (value: string) => void
}

const CategoryInput: NextPage<CategoryInputProps> = ({
    icon,
    iconColor = '',
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                b-2
                p-4
                flex
                flex-col
                gap-3
                hover:b-black
                b-solid
                transition
                cursor-pointer
                ${selected ? 'b-black bg-rose-1' : 'b-neutral-2'}
            `}>
            <i className={`${icon} ${iconColor} text-30px`}></i>
            <div className="font-semibold">
                {label}
            </div>

        </div>
    );
}
 
export default CategoryInput;