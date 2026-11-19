"use client"

import {AnimatePresence, motion} from "motion/react";
import { useEffect } from "react";


function DotsJumping() {
    const dotVariants = {
        jump: {
            transform: "translateY(-30px)",
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
        	{
        		Array.from({length: 20}).map((_, i) => (
					<motion.div
						key={i}
						className="dot bg-primary"
						variants={dotVariants}
						/>
        		))
        	}
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                will-change: transform;
                z-index: 99999;
            }
            `}
        </style>
    )
}

export default function LoadingOvertake({ active = true }){

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	return(
        <AnimatePresence>
    		<motion.div
                exit={{
                    opacity: [1, 0]
                }}  

                transition={{
                    duration: 0.5
                }}

    			className="fixed overflow-hidden z-[99999] flex flex-col gap-10 items-center justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-xl"
    		>
    			<DotsJumping />

    			<p
    				className="w-xl text-center text-lg "
    			>
    				Hello visiter. <br />
    				Since this is a College project, we've setup our <span className="text-primary font-medium"> backend in Render.</span> <br />
    				Please wait a few second for render to complete loading our server. <br />
    				<span className="text-primary font-medium"> Thank you. </span>
    			</p>

    		</motion.div>
        </AnimatePresence>
	)
}
