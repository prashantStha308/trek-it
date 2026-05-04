import Navbar from "@/components/layout/Navbar";
import { AnimatePresence } from "motion/react";
import Footer from "@/components/layout/Footer";


export default function StandardLayout({ children }) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50" >
                <Navbar />
            </div>
            
            <AnimatePresence>                
                <main className="isolate h-full w-full mt-16 px-4 py-2 flex-1 flex flex-col">
                    {children}
                </main>
            </AnimatePresence>

            <Footer />
        </>
    )
}