'use client'

import { NextPage } from 'next'
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface InputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: NextPage<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
    return ( <div className='relative w-full'>
        {formatPrice && (
            <i
                className={`absolute top-5 left-2`}
                text="24px neutral-7"></i>
        )}
        <input
            id={id}
            disabled={disabled}
            { ...register(id, { required }) }
            type={type}
            placeholder=''
            className={`
                peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                b-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                border-solid
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'b-rose-5' : 'b-neutral-3'}
                ${errors[id] ? 'focus:b-rose-5' : 'focus:b-black'}
            `} />
        <label
            className={`
                absolute
                text-base
                duration-150
                transform
                -translate-y-3
                top-5
                z-10
                origin-tl
                ${formatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-5' : 'text-zinc-4'}
        `}>
            {label}
        </label>
    </div> );
}

export default Input;