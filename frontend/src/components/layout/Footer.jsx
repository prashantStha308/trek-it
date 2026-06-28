"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import HDivider from "./HDivider";
import TrekItLogo from "@/components/ui/TrekItLogo";

const PAGES = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Explore", href: "/explore" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const logoSrc = mounted && resolvedTheme === 'dark' 
        ? '/assets/svg/ico_white.svg' 
        : '/assets/svg/ico_black.svg';

    return (
        <footer className="bg-background border-t border-border text-text mt-20 isolate">

            {/* top accent line */}
            <HDivider />

            <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <TrekItLogo size={40} src={logoSrc} />

                        <article className="flex flex-col gap-2" >

                            <h1 className="text-lg leading-relaxed text-text/75 font-bold" >
                                Search, Customize, Book. <span className="text-primary" > Trek-It </span>
                            </h1>

                            <p className="text-sm leading-relaxed max-w-xs text-text opacity-60">
                                Connect with experienced local guides and discover Nepal's most breathtaking trails.
                            </p>
                        </article>

                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                            Navigation
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {PAGES.map((page) => (
                                <li key={page.href}>
                                    <Link
                                        href={page.href}
                                        className="text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group opacity-70 hover:opacity-100 text-text"
                                    >
                                        <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3 bg-primary inline-block" />
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                            About
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {["Privacy Policy", "Terms of Service", "Contact Us", "Help Center"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm transition-all duration-200 inline-flex items-center gap-2 group opacity-70 hover:opacity-100 text-text"
                                    >
                                        <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3 bg-accent inline-block" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* bottom bar */}
                <div className="mt-12 pt-2 flex items-center justify-center gap-4 text-xs border-t border-border text-text opacity-50">
                    <span>© {year} Trek-It. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}