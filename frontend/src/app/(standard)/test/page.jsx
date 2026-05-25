"use client"

import BreadCrumbs from "@/components/package/BreadCrumbs";

export default function Test() {

    const stops = ["Kathmandu", "Pokhara", "Fanglung", "Fidim", "Illam", "Dharan", "Kathmandu"]

    return (
        <section
            className="h-screen w-full flex justify-center items-center"
        >
            <BreadCrumbs />
        </section>
    )
}