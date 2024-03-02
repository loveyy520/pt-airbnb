import { NextPage } from "next";
import { ReactNode } from "react";
interface ContainerProps {
    children?: ReactNode
}
const Container: NextPage<ContainerProps> = ({ children }) => {
    return <section className="max-w-2520px mx-auto" px="xl:20 md:10 sm:2 4">
        { children }
    </section>
}

export default Container