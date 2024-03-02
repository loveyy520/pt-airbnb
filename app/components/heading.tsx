
'use client'

import { NextPage } from "next"

interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}

const Heading: NextPage<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return (
        <div text={center ? 'center' : 'start'}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral5 mt-2">
                {subtitle}
            </div>
        </div>
    );
}

export default Heading;