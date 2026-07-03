"use client"
import {useState} from "react";

import GuideProfieSkeleton from "@/components/loaders/GuideProfieSkeleton"
import PackageCardSkeleton from "@/components/loaders/PackageCardSkeleton"

import LoadingSection from "@/components/loaders/LoadingSection"


export default function Test() {


    return (
        <section
            className="h-full w-full flex flex-col gap-8 justify-center items-center"
        >

            <LoadingSection />
            <LoadingSection card="guide" />


        </section>
    )
}