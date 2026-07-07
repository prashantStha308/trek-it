"use client";

import { useState } from "react";
import { motion } from "motion/react";

import DashboardTabButton from "./DashboardTabButton";

export default function DashboardTabs({
    tabs,
    defaultTab,
    layoutId = "dashboard-tab",
}) {
    const [activeTab, setActiveTab] = useState(
        defaultTab ?? tabs[0]?.id
    );

    const active = tabs.find(
        (tab) => tab.id === activeTab
    );

    return (
        <section className="flex flex-col gap-8 px-8">

            <nav className="flex justify-center">
                <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-border bg-primary/5">

                    {tabs.map((tab) => (
                        <DashboardTabButton
                            key={tab.id}
                            active={activeTab === tab.id}
                            icon={tab.icon}
                            label={tab.label}
                            layoutId={layoutId}
                            onClick={() =>
                                setActiveTab(tab.id)
                            }
                        />
                    ))}

                </div>
            </nav>

            <motion.section
                key={activeTab}
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.2,
                }}
            >
                {active?.content}
            </motion.section>

        </section>
    );
}