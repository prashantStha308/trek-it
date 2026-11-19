"use client"

import Navbar from "@/components/layout/Navbar";
import {NavbarMobileBottom, NavbarMobileTop} from "@/components/layout/NavbarMobile";

import { AnimatePresence } from "motion/react";
import Footer from "@/components/layout/Footer";
import NotificationBar from "@/components/notification/NotificationBar";
import SearchModal from "@/components/ui/SearchModal";

import { useGetMe } from "@/queries/auth.query";
import useBreakpoint from "@/hooks/useBreakpoint";

import useUIStore from "@/store/ui.store.js";
import { useEffect, useState } from "react";
import LoadingOvertake from "@/components/loaders/LoadingOvertake";


export default function StandardLayout({ children }) {
    
    const [serverOn, setServerOn] = useState(false);

    const isMobile = useBreakpoint(640);
    const {data:loggedInUser, isLoading} = useGetMe();
    const isSearchModalOpen = useUIStore((s) => s.isSearchModalOpen);

    useEffect(()=>{
        async function checkHealth(){
            const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/check` );

            setServerOn(true);
        }

        checkHealth();
    }, [])

    return (
        <>
            {
                (isMobile && loggedInUser) ? (
                    <div className="fixed top-0 left-0 right-0 z-50" >
                        <NavbarMobileTop />
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 right-0 z-50" >
                        <Navbar />
                    </div>
                )
            }

            {
                !serverOn && <LoadingOvertake />
            }
            
            <NotificationBar />

            <AnimatePresence>
                {isSearchModalOpen && <SearchModal />}
            </AnimatePresence>

            <main className={`isolate h-full w-full mt-16 px-4 py-2 flex-1 flex flex-col`}>
                {children}
            </main>

            <Footer />

            <div className="fixed bottom-0 left-0 right-0 z-50" >
                {(isMobile && loggedInUser) && <NavbarMobileBottom />}
            </div>

        </>
    )
}