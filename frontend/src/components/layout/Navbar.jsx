"use client"

import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/Button";
import NavDropdown from "./NavDropdown";
import Link from "next/link";


export default function Navbar() {


    return (
        <header className=" flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-3xl py-3 px-9 z-50">
            <NavDropdown />

            <div className="flex items-center gap-3">
                <span className="hidden md:block " >
                    <ThemeToggle />
                </span>

                <Link href={"/login"} >
                    <Button text="Sign In" variant="outline" />
                </Link>

                <Link href={"/register"} >
                    <Button text="Sign Up" variant="primary"/>
                </Link>
            </div>

        </header>
    )
}