"use client";

import { motion } from "motion/react";

export default function DashboardTabButton({
    active,
    icon: Icon,
    label,
    onClick,
    layoutId = "dashboard-tab",
}) {
    return (
        <button
            onClick={onClick}
            className="relative cursor-pointer"
        >
            {active && (
                <motion.div
                    layoutId={layoutId}
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 38,
                    }}
                    className="absolute inset-0 rounded-md bg-primary shadow-sm"
                />
            )}

            <span
                className={`
                    relative z-10 flex items-center gap-2
                    px-5 py-2 rounded-xl
                    text-sm font-medium transition-colors
                    ${
                        active
                            ? "text-white"
                            : "text-text/70 hover:text-primary"
                    }
                `}
            >
                {Icon && <Icon size={17} />}
                {label}
            </span>
        </button>
    );
}