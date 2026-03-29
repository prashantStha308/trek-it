"use client"

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

	const [heroHeight, setHeroHeight] = useState(0);
	const heroRef = useRef();

	useEffect(() => {
		if(heroRef.current){
			setHeroHeight(heroRef.current.offsetHeight);
		}
	},[])

	return (
		<main
			id="home"
			className="relative w-full min-h-screen pt-16"
		>
			<section
				ref={heroRef}
				id="hero"
				className="h-72"
			>
				<Image
					src={"/assets/img/hero-img.png"}
					alt="hero-img"
					fill
					className="object-cover -z-10"
				/>
				{/* <div className="relative z-10">
					<h1 className="text-xl font-black">
						sldkjfklsdjfklsjdflkj
					</h1>
				</div> */}
			</section>

			<section
				className="w-full flex justify-center"
				style={{marginTop: heroHeight}}
			>
				<div>
					<input
						type="text"
						placeholder="search by language, location, name..."
						className="bg-green-200 rounded-full border-none py-4 px-8 text-sm w-lg focus:outline-green-700"
					/>
					<button>
						<Search />
					</button>
				</div>
			</section>
		</main>
	);
}
