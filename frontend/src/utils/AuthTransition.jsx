"use client"

import { motion, AnimatePresence } from "motion/react"

export default function AuthTransition({ children, key }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}