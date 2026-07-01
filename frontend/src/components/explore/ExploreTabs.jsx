import {motion} from "motion/react";
import { TABS } from "@/hooks/useExploreState";


export default function ExploreTabs({ tab, handleTabChange }) {

    return(
        <motion.section
            className="w-full h-12 flex flex-col justify-end gap-1 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
            }}
        >
            <div className="flex gap-2">
                {Object.keys(TABS).map(_tab => (
                    <button
                        key={_tab}
                        onClick={() => handleTabChange(_tab)}
                        className={`${tab === _tab ? "bg-primary/25 text-accent font-semibold " : ""} hover:bg-primary/15 px-4 py-2 rounded-lg cursor-pointer capitalize`}
                    >
                        {_tab}
                    </button>
                ))}
            </div>
            <div className="w-full h-0.5 bg-secondary rounded-full" />
        </motion.section>
    )
}