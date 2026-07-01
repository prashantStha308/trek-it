"use client"
import { Suspense } from "react";

import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal } from "lucide-react";

import DataSection from "@/components/explore/DataSection";

// Sub-components
import SearchPanel from "@/components/explore/SearchPanel";
import AnimatedTabWord from "@/components/explore/AnimatedTabWord";
import ExploreTabs from "@/components/explore/ExploreTabs";
import ExploreHeader from "@/components/explore/ExploreHeader";

import { useExploreState, TABS } from "@/hooks/useExploreState";


// Main Page
function ExplorePageMain() {

    const {
        tab, setTab, handleTabChange,
        currentSearch, handleSearchWords,
        currentFilter, setCurrentFilter,
        currentShowFilters, setCurrentShowFilters,
        data, isLoading,
        metaData, isMetaLoading,
    } = useExploreState();

    return (
        <section className="h-full flex flex-col items-center gap-20">

            <section className="md:px-8 lg:px-16 w-full lg:w-7/12 flex flex-col gap-8">

                <ExploreHeader
                    data={data}
                    isLoading={isLoading}
                    tab={tab}
                />

                <ExploreTabs
                    tab={tab}
                    handleTabChange={handleTabChange}
                 />

                {/* Search and Filters */}
                <SearchPanel
                    search={currentSearch}
                    onChange={handleSearchWords}
                    showFilters={currentShowFilters}
                    setShowFilters={setCurrentShowFilters}
                    filter={currentFilter}
                    setFilter={setCurrentFilter}
                    metaData={metaData} isMetaLoading={isMetaLoading}
                    tab={tab}
                />

            </section>

            <DataSection
                data={data?.docs}
                isLoading={isLoading}
                card={ tab === "package" ? "package" : "guide" }
            />

        </section>
    );
}

export default function ExplorePage(){
    return(
        <Suspense>
            <ExplorePageMain />
        </Suspense>
    )
}