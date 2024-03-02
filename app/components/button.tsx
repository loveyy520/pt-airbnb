'use client'

import { NextPage } from "next"
import { MouseEvent } from "react"

interface ButtonProps {
    label: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: string
}

const Button: NextPage<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon
}) => {
    return ( <button
        onClick={onClick}
        disabled={disabled}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-white' : 'bg-rose-5'}
            ${outline ? 'b-black' : 'b-rose-5'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-base'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'b-1' : 'b-2'}
        `}>
        { icon && <i className={`absolute left-4 top-3 text-24px ${icon}`}></i> }
        {label}
    </button> );
}

export default Button;