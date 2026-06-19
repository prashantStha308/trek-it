import {motion} from "motion/react";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
};


export default function AnimatedTabWord({ word, variants, isActive }){
	return(
	    <motion.div
	        variants={container}
	        initial="hidden"
	        animate={isActive ? "show" : "hidden"}
	    >
	        {word.split("").map((char, index) => (
	            <motion.span
	                key={index}
	                variants={variants}
	                className="inline-block"
	                transition={{ type: "spring", stiffness: 80, damping: 10 }}
	            >
	                {char}
	            </motion.span>
	        ))}
	    </motion.div>
	)
}