import { motion } from "motion/react";


export default function SkeletonBlock({ className = "" }) {
    return (
        <div className={`relative overflow-hidden bg-gray-300 dark:bg-gray-800 ${className}`}>
	        <motion.div
	            animate={{ x: ["-150%", "500%"] }}
	            transition={{
	                duration: 1.5,
	                repeat: Infinity,
	                ease: "easeInOut",
	            }}
	            className="absolute inset-y-0 left-0 w-1/3 bg-white/30 dark:bg-white/10 blur-xl"
	        />
        </div>
    );
}
