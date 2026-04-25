"use client"

import { SearchBar } from "@/components/explore/SearchBar";
import PackageList from "@/components/packages/PackageList";
import { useGetAllPackages } from "@/queries/package.queries";
import Image from "next/image";
import { motion, spring } from "motion/react";
import { ChevronRight } from "lucide-react";



const containerVarient = {
    hidden: {
        y:90,
        opacity: 0.25,
    },
    visible: {
        y:0,
        opacity: 1,
        transition: {
            delay: 2,
            staggerChildren: 0.065,
            type: spring,
            stiffness: 280,
            damping: 80
        },
    },
};


export const StaggeringBites = ({ top, bottom }) => {

    return (
        <motion.p
            initial="hidden"
            whileInView="visible"
            variants={containerVarient}
            className="flex flex-col items-center gap-2"
            viewport={{ once: true }}
        >
            <span
                className="text-3xl text-primary drop-shadow-2xl drop-shadow-primary"
            >
                {top}
            </span>

            <span
                className="text-3xl text-accent drop-shadow-2xl drop-shadow-accent"
            >
                {bottom}
            </span>
        </motion.p> 
    )
}

export const StaggeringHeroText = () => {
    const firstText = "Search, Customize, Book.";
    const spanText = "Trek-It";

    const firstWords = firstText.split(" ");
    const allWords = [...firstWords, spanText];

    return (
        <motion.h1
            className="absolute top-0 flex justify-center items-center w-full text-center text-4xl font-semibold z-10 overflow-clip cursor-pointer pb-2"
            whileInView="visible"
            initial="rest"
            viewport={{ once: true }}
        >
            {allWords.map((word, index) => {
                const isSpan = index >= firstWords.length;

                if (isSpan) {
                    return (
                        <motion.button
                            key={index}
                            className="flex justify-evenly gap-3 items-center uppercase text-green-100  underline bg-primary cursor-pointer leading-none px-2 rounded-sm m-0 font-semibold text-2xl shadow-[-3px_3px_5px_0px_var(--color-green-900)] transition-all ease-in duration-75"
                            variants={{
                                visible: { y: 0, transition: { delay: 0.5 * index, duration: 0.15, ease: "easeInOut" } },
                                rest: { y: "180%", transition: { delay: 0 } },
                            }}
                            transition={{
                                duration: 0.15,
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                boxShadow: "-1px 1px 0px 0px var(--color-green-900)",
                                transition: { duration: 0.075, ease: "easeIn" } 
                            }}
                            onClick={() => document.getElementById("scrollHere").scrollIntoView({ behavior: "smooth" })}
                        >
                            {word}
                            <ChevronRight size={50} />
                        </motion.button>
                    );
                }

                return (
                    <motion.span
                        key={index}
                        className="text-accent uppercase transition-all ease-in duration-75"
                        variants={{
                            visible: { y: 0, transition: { delay: 0.5 * index, duration: 0.15, ease: "easeInOut" } },
                            rest: { y: "180%", transition: { delay: 0 } },
                        }}
                        transition={{
                            duration: 0.15,
                            ease: "easeInOut",
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                );
            })}
        </motion.h1>
    );
};

export default function Home() {
    const packageQuery = useGetAllPackages({ limit: 8, page: 1 });
    
    const biteData = [
        { top: "50K", bottom: "Guides" },
        { top: "5K", bottom: "Packages" },
        { top: "Over 30K", bottom: "Happy Customers" },
    ]

    return (
        <main
            id="home"
            className="relative w-full min-h-screen pt-16 flex flex-col gap-24"
        >
            <section className="relative h-[90vh] overflow-hidden">
                <Image
                    src="/assets/img/hero-img.png"
                    alt="hero-img"
                    fill
                    priority
                    className="object-cover object-top mix-blend-color-burn"
                />


                    <StaggeringHeroText />

                <article
                    className="absolute bottom-25 font-black flex justify-evenly w-full "
                >
                    {
                        biteData.map((item, index) => <StaggeringBites key={index} top={item.top} bottom={item.bottom} />)
                    }
                </article>

            </section>

            <section
                id="search-bar"
                className="w-full flex justify-center"
            >
                <SearchBar />
            </section>

            <PackageList label={"Package"} query={packageQuery} id="scrollHere" />

        </main>
    );
}
