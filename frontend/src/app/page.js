"use client"

import { SearchBar } from "@/components/explore/SearchBar";
import PackageList from "@/components/packages/PackageList";
import Image from "next/image";

export default function Home() {

	return (
		<main
			id="home"
			className="relative w-full min-h-screen pt-16"
		>
			<section
				id="hero"
				className="h-72"
			>
				<Image
					src={"/assets/img/hero-img.png"}
					alt="hero-img"
					fill
					className="object-cover -z-10"
				/>
			</section>

			<section
				id="stats"
				className="w-full flex justify-center"
			>
				<SearchBar />

				<section>

				</section>
			</section>

			<PackageList />
		</main>
	);
}
