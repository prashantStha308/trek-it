import {motion} from "motion/react";


export default function ModalWrapper({children}){

	return(
		<section
			className="fixed top-12 flex justify-center items-center h-screen w-screen z-40 isolate"
		>

			<motion.section
				initial={{
					y:1000
				}}
				animate={{
					y: 0
				}}
				exit={{
					y:1000
				}}
				transition={{
				    type: "spring",
				    stiffness: 300,
				    damping: 30,
				}}

				className="h-full w-full p-8 pb-15 z-20"
			>
				{children}
			</motion.section>
				
			<motion.section
				initial={{
					opacity:0
				}}
				animate={{
					opacity: 1
				}}
				exit={{
					opacity:0
				}}
				transition={{
				    type: "spring",
				    stiffness: 300,
				    damping: 30,
				}}

				className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-3xl p-4 z-10"
			/>

		</section>
	)
}