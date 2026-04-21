"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from "react"
import ThemeToggle from "../ThemeToggle";


const PAGES = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Explore", href: "/explore" },
    { name: "Guides", href: "/guide" },
    { name: "Bookings", href: "/booking" },
    { name: "About", href: "/about" },
    ...(process.env.NODE_ENV === "development" ? [{ name: "Test", href: "/test" }] : [])
]


const Button = ({ text, variant = "outline" }) => (
    <button
        className={`border border-green-600/60 rounded-full px-4 py-1 text-sm cursor-pointer focus:outline-1 transition-colors
            ${variant === "primary" ? "bg-green-600 text-white hover:bg-green-700" : "hover:bg-green-600/10 hover:text-green-700"}`}
    >
        {text}
    </button>
)

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null);

    const path = usePathname();
    const segments = path.split('/');
    const current = segments[segments.length - 1];
    const selectedPage = PAGES.find(p => p.href === `/${current}`)?.name ?? "Home";

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <header className=" flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-3xl py-3 px-9 z-50">

            <div id="logo" className=" flex gap-4 items-center ">
                <Link href={'/'} className="hidden md:flex" >
                    <Image src="/assets/svg/ico_1.svg" alt="trek-it-logo" width={30} height={30} aria-hidden={true} />
                </Link>

                <nav aria-label="Site navigation" ref={dropdownRef} className="relative flex items-center gap-1">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-1 text-xs md:text-base lg:text-lg font-medium cursor-pointer relative group pb-0.5"
                    >
                        Trek-It
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                        <span className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-0 group-hover:w-full transition-all duration-200 rounded-full" />
                    </button>

                    {open && (
                        <ul className="absolute top-full left-0 mt-2 w-44 bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
                            {PAGES.map((page, index) => (
                                <Link href={page.href} key={index} >
                                    <li
                                        onClick={() => setOpen(false)}
                                        className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-50 ease-out
                                            ${selectedPage === page.name
                                                ? "bg-green-50 dark:bg-blue-50/5 text-green-700 dark:text-blue-200 font-semibold"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-50/10 "
                                            }`}
                                    >
                                        {page.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </nav>

                <span aria-hidden={true} className="text-xs md:text-sm cursor-pointer text-gray-500 dark:text-gray-300 bg-black/5 dark:bg-green-300/15 px-3 py-0.5 rounded-full">
                    {selectedPage}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span className="hidden md:block " >
                    <ThemeToggle />
                </span>

                <Button text="Sign In" />
                <Button text="Sign Up" variant="primary"/>
            </div>

        </header>
    )
}