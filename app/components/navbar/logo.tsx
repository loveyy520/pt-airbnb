'use client'

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: NextPage = () => {
    const router = useRouter()

    return <Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="300"
        src="/images/logo.png" />
}

export default Logo