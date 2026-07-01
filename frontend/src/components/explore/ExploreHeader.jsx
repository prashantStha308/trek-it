import { motion } from "motion/react";

import { TABS } from "@/hooks/useExploreState";
import AnimatedTabWord from "@/components/explore/AnimatedTabWord";


// Animation variants
const childPackage = {
    hidden: { y: 50 },
    show: { y: 0 }
};

const childGuide = {
    hidden: { y: 50 },
    show: { y: -36 }
};


export default function ExploreHeader({
	isLoading,
	data,
	tab,

}) {

	return(
        <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-semibold text-accent flex items-center gap-2">
                Explore
                <div className="relative capitalize text-primary h-8 w-44 overflow-hidden">
                    <AnimatedTabWord word={TABS.package + "s"} variants={childPackage} isActive={tab === TABS.package} />
                    <AnimatedTabWord word={TABS.guide + "s"} variants={childGuide} isActive={tab === TABS.guide} />
                </div>
            </h1>
            <p className="text-sm text-text/55">
                {isLoading ? "Loading..." : `${data?.total || 0} ${tab}s available`}
            </p>
        </motion.header>
	)
}