import { NextPage } from "next/types"
import { useCallback } from "react"

interface CounterProps {
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

const Counter: NextPage<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [value, onChange])

    const onReduce = useCallback(() => {
        if (value === 1) return
        onChange(value - 1)
    }, [value, onChange])

    return ( <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="font-light text-gray-6">
                {subtitle}
            </div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div
                onClick={onReduce}
                className="
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-neutral-6
                    cursor-pointer
                    hover:opacity-80
                    transition
                "
                b="1px solid neutral-4">
                <i className="i-ic:outline-minus text-22px"></i>
            </div>
            {value}
            <div
                onClick={onAdd}
                className="
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-neutral-6
                    cursor-pointer
                    hover:opacity-80
                    transition
                "
                b="1px solid neutral-4">
                <i className="i-ic:outline-plus text-22px"></i>
            </div>

        </div>
    </div> );
}
 
export default Counter;