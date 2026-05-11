"use client"

import ThemeToggle from "./ThemeToggle";
import { LinkButton } from "../ui/Button";
import NavDropdown from "./NavDropdown";
import Image from "next/image";
import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

import {optimizeImageUrl} from "@/utils/utils.helper";
import {useGetMe, useLogout} from "@/queries/auth.query";


function NavbarUserSect(){
    const {data, isLoading, isError, error} = useGetMe();
    const logout = useLogout();

    return(
        <section
            className={`flex items-center gap-3`}
        >
            <div className="flex text-text cursor-pointer hover:bg-secondary p-2 rounded-md" >
                <ThemeToggle />
            </div>
            {
                data ? 
                <>
                    <Link href={"/chat"} className="text-text  hover:bg-secondary p-2 rounded-md" >
                        <MessageCircle size={20} />
                    </Link>

                    <Link href={"/notifications"} className="text-text hover:bg-secondary p-2 rounded-md" >
                        <Bell size={20} />
                    </Link>

                    <div
                        className="border-2 border-primary rounded-full cursor-pointer hover:bg-primary"
                        onClick={ ()=> {
                            logout.mutate()
                        } }
                    >
                        <Avatar src={data?.profilePicture?.src} alt={data?.name} size={"xs"} />
                    </div>

                </>
                :
                <>

                    <LinkButton href={"/login"} variant="outline" >
                        Sign In
                    </LinkButton>

                    <LinkButton href={"/register"} variant="primary" >
                        Sign Up
                    </LinkButton>
                </>
            }
        </section>
    )
}

export default function Navbar() {

    return (
        <header className=" flex justify-between items-center bg-secondary/35 dark:bg-secondary/15 backdrop-blur-3xl py-2 px-9 z-50">
            <NavDropdown />

            <NavbarUserSect />

        </header>
    )
}