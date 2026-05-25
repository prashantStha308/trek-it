"use client"

import ThemeToggle from "./ThemeToggle";
import { LinkButton } from "../ui/Button";
import NavDropdown from "./NavDropdown";
import Image from "next/image";
import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

import {optimizeImageUrl} from "@/utils/utils.helper";
import {useGetMe} from "@/queries/auth.query";


const PAGES = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Explore", href: "/explore" },
    // { name: "Guides", href: "/guide" },
    // { name: "Bookings", href: "/booking" },
    // { name: "About", href: "/about" },
    ...(process.env.NODE_ENV === "development" ? [{ name: "Test", href: "/test" }] : [])
]

function NavbarV2UserSect(){
    const {data, isLoading, isError, error} = useGetMe();

    return(
        <section
            className={`flex items-center gap-3`}
        >
{/*            <div className="flex text-text cursor-pointer hover:bg-secondary p-2 rounded-md" >
                <ThemeToggle />
            </div>*/}
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

export default function NavbarV2() {

    return (
        <header className="border border-secondary rounded-lg mx-2 mt-0.5 flex justify-between items-center bg-secondary/35 dark:bg-secondary/15 backdrop-blur-3xl py-2 px-9 z-50">
            {/*<NavDropdown />*/}

            <div id="logo" className=" flex gap-4 items-center ">
                <Link href={'/'} className="hidden md:flex" >
                    <Image src="/assets/svg/ico_3.svg" alt="trek-it-logo" width={30} height={30} aria-hidden={true} />
                </Link>

                    <p
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-1 text-xs md:text-base lg:text-lg xl:text-xl font-medium cursor-pointer relative group pb-0.5"
                    >
                        Trek-It
                    </p>
            </div>

            <nav
                className="flex gap-8 text-sm text-text/75"
            >
                {
                    PAGES.map((page, index)=>(
                        <Link
                            key={index}
                            href={page.href}
                            className="relative group"
                        >
                            <span>
                                {page.name}
                            </span>

                            <div className="w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-200 ease-in-out rounded-full" />

                        </Link>
                    ))
                }
            </nav>


            <NavbarV2UserSect />

        </header>
    )
}