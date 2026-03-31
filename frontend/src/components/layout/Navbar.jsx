"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"


const PAGES = [
    { name: "Home", href:"/"},
    { name: "Explore", href:"/explore"},
    { name: "Guides", href:"/guide"},
    { name: "Bookings", href:"/booking"},
    { name: "About", href:"/about"},
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
    const [selectedPage, setSelectedPage] = useState("Home")
    const dropdownRef = useRef(null)

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
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white/10 backdrop-blur-2xl py-2 px-9">

            <div id="logo" className="flex gap-4 items-center">
                <Link href={'/'}>
                    <Image src="/assets/svg/ico_1.svg" alt="trek-it-logo" width={30} height={30} aria-hidden={true} />
                </Link>

                <nav aria-label="Site navigation" ref={dropdownRef} className="relative flex items-center gap-1">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-1 text-lg font-medium cursor-pointer relative group pb-0.5"
                    >
                        Trek-It
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                        <span className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-0 group-hover:w-full transition-all duration-200 rounded-full" />
                    </button>

                    {open && (
                        <ul className="absolute top-full left-0 mt-2 w-44 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden z-50">
                            {PAGES.map((page, index) => (
                                <li
                                    key={index}
                                    onClick={() => { setSelectedPage(page.name); setOpen(false) }}
                                    className={`px-4 py-2 text-sm cursor-pointer transition-colors
                                        ${selectedPage === page.name
                                            ? "bg-green-50 text-green-700 font-semibold"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    <Link href={page.href} >
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>

                <span aria-hidden={true} className="text-sm text-gray-500 bg-black/5 px-3 py-0.5 rounded-full">
                    {selectedPage}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <Button text="Sign In" />
                <Button text="Sign Up" />
            </div>

        </header>
    )
}