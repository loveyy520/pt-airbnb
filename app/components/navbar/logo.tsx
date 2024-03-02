'use client'

import { NextPage } from "next";
import Image from "next/image";

const Logo: NextPage = () => {
    return <Image
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="300"
        src="/images/logo.png" />
}

export default Logo