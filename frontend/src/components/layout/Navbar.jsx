"use client"

import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/Button";
import NavDropdown from "./NavDropdown";
import Image from "next/image";
import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import {optimizeImageUrl} from "@/utils/utils.helper";

import {useGetMe} from "@/queries/auth.query";


function NavbarUserSect(){

    const {data, isLoading, isError, error} = useGetMe();

    console.log("Navbar: ",data);

    return(
        <section
            className={`flex items-center gap-4`}
        >
            <div className="flex text-text cursor-pointer hover:bg-secondary p-2 rounded-md" >
                <ThemeToggle />
            </div>
            {
                data ? 
                <>
                    <Link href={"/chat"} className="text-text  hover:bg-secondary p-2 rounded-md" >
                        <MessageCircle  />
                    </Link>

                    <Link href={"/notification"} className="text-text hover:bg-secondary p-2 rounded-md" >
                        <Bell size={25} />
                    </Link>

                    <div
                        className="border-4 border-primary rounded-full cursor-pointer"
                    >
                        <Image 
                          src={data.profilePicture.src} 
                          unoptimized 
                          alt={data.name} 
                          width={40} 
                          height={40}
                          className="rounded-full object-cover object-center h-8 w-8 border-4 border-transparent"
                        />
                    </div>
                </>
                :
                <>

                    <Link href={"/login"} >
                        <Button variant="outline"> Sign In </Button>
                    </Link>

                    <Link href={"/register"} >
                        <Button variant="primary"> Sign Up </Button>
                    </Link>
                </>
            }
        </section>
    )
}

export default function Navbar() {

    return (
        <header className=" flex justify-between items-center bg-secondary/35 dark:bg-secondary/15 backdrop-blur-3xl py-3 px-9 z-50">
            <NavDropdown />

            <NavbarUserSect />

        </header>
    )
}