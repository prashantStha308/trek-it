"use client"
import LoadingSection from "@/components/loaders/LoadingSection"
import LoadingOvertake from "@/components/loaders/LoadingOvertake";


export default function Test() {

    return (
        <section
            className="h-full w-full flex flex-col gap-8 justify-center items-center"
        >

            <LoadingOvertake />

            <LoadingSection />
            <LoadingSection card="guide" />


        </section>
    )
}