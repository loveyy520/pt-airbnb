
'use client'

import { NextPage } from "next";
import { useEffect } from "react";
import EmptyState from "./components/empty-state";

interface ErrorStateProps {
    error: Error
}

const ErrorState: NextPage<ErrorStateProps> = ({
    error
}) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return <EmptyState
        title="Uh oh"
        subtitle="Something went wrong!" />
}
 
export default ErrorState;