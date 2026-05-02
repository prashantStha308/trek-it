// components/layout/NavDropdown.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import DropdownMenu from '@/components/ui/DropdownMenu';
import Image from 'next/image';

const PAGES = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Explore", href: "/explore" },
    { name: "Guides", href: "/guide" },
    { name: "Bookings", href: "/booking" },
    { name: "About", href: "/about" },
    ...(process.env.NODE_ENV === "development" ? [{ name: "Test", href: "/test" }] : [])
]

export default function NavDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const path = usePathname();
    const segments = path.split('/');
    const selectedPage = PAGES.find(page => segments.includes(page.name?.toLowerCase()))?.name ?? "Home" ;

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);


    return (
        <div id="logo" className=" flex gap-4 items-center ">
            <Link href={'/'} className="hidden md:flex" >
                <Image src="/assets/svg/ico_3.svg" alt="trek-it-logo" width={30} height={30} aria-hidden={true} />
            </Link>
            <nav aria-label="Site navigation" ref={dropdownRef} className="relative flex items-center gap-1">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center gap-1 text-xs md:text-base lg:text-lg xl:text-xl font-medium cursor-pointer relative group pb-0.5"
                >
                    Trek-It
                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                    <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-200 rounded-full" />
                </button>

                <DropdownMenu open={open}>
                    {PAGES.map((page, index) => (
                        <Link href={page.href} key={index}>
                            <li
                                onClick={() => setOpen(false)}
                                className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-50 ease-out
                                    ${selectedPage === page.name
                                        ? "bg-secondary dark:bg-blue-50/5 text-accent dark:text-blue-200 font-semibold"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-50/10"
                                    }`}
                            >
                                {page.name}
                            </li>
                        </Link>
                    ))}
                </DropdownMenu>
            </nav>

            <span aria-hidden={true} className="text-xs md:text-sm cursor-pointer text-gray-500 dark:text-gray-300 bg-black/5 dark:bg-primary/15 px-3 py-0.5 rounded-full ">
                {selectedPage}
            </span>
        </div>
    );
}