'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { NextPage } from "next/types"
import { useCallback } from "react"

import qs from 'query-string'

interface CategoryBoxProps {
    label: string
    description: string
    icon: string
    iconColor: string
    selected?: boolean
}

const CategoryBox: NextPage<CategoryBoxProps> = ({
    label,
    icon,
    iconColor,
    description,
    selected
}) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = qs.parse(params.toString())

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get?.('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })
        router.push(url)
    }, [label, params, router])
    return (
        <div
            onClick={handleClick}
            className="flex flex-col items-center justify-center gap-2 p-3 b-b-solid b-b-2 hover:text-neutral-8 transition cursor-pointer"
            b={selected ? 'b-b-neutral-8' : 'b-transparent'}
            text={selected ? 'neutral-800' : 'neutral-5'}>
            <i className={`${icon} ${iconColor} text-26px`}></i>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
}
 
export default CategoryBox;