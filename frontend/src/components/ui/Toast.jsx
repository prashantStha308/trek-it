"use client"

import useUIStore from "@/store/ui.store";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from 'react'


const variants = {
    hidden: {
        y: "150%",
        opacity: 0,
    },
    display: {
        y: "0%",
        opacity: 1,
    }
}

const Toast = () => {
    const isToastOpen = useUIStore(store => store.isToastOpen);
    const toastData = useUIStore(store => store.toastData);
    const closeToast = useUIStore(store => store.closeToast);


    return (
        <>
            <AnimatePresence>
                {isToastOpen && (
                    <motion.div
                        key={"toast"}
                        id='toast'
                        className="fixed z-9999 bottom-6 w-full flex justify-center "
                        variants={variants}
                        initial="hidden"
                        animate="display"
                        exit="hidden"
                        transition={{
                            type: "spring",
                            stiffness: 290,
                            damping: 28.6,
                            mass: 2,
                        }}
                        onAnimationComplete={(definition) => {
                            if (definition === "display") {
                                setInterval(() => {
                                    closeToast();
                                }, 3000)
                            }
                        }}
                    >
                        <div
                            className="px-4 py-2 border border-border text-text rounded-lg bg-secondary/45 w-xs h-fit relative flex flex-col gap-4"
                        >
                            <header
                                className="flex items-center justify-between"
                            >
                                <h3> {toastData.title} </h3>

                                <button
                                    className="cursor-pointer hover:bg-black/20 rounded-sm p-2 transition-colors ease-in-out duration-100"
                                    onClick={closeToast}
                                >
                                    <X />
                                </button>
                            </header>

                            <section>
                                {toastData.message}
                            </section>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Toast