'use client'

import { NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";

interface ClientOnlyProps {
    children: ReactNode
}

const ClientOnly: NextPage<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])

    return hasMounted ? <>{children}</> : null
}

export default ClientOnly;