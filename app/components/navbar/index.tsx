import { SafeUser } from "@/types";
import { NextPage } from "next";
import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

interface NavBarProps {
    currentUser?: SafeUser
}

const Navbar: NextPage<NavBarProps> = ({ currentUser }) => {
    
    return <header className="fixed w-full bg-white z-10 shadow-sm">
        <div py="4" b="b-1 solid neutral-1">
            <Container>
                <div className="flex flex-row items-center justify-between" gap="3 md:0">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={ currentUser } />
                </div>
            </Container>
        </div>
        <Categories />
    </header>
}

export default Navbar