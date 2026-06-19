"use client"
import { Suspense } from "react";

import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal } from "lucide-react";

import { PackageCard } from "@/components/package/PackageCard.jsx";
import GuideProfileCard from "@/components/guide/GuideProfileCard.jsx";

// Sub-components
import SearchPanel from "@/components/explore/SearchPanel";
import AnimatedTabWord from "@/components/explore/AnimatedTabWord";

import { useExploreState, TABS } from "@/hooks/useExploreState";


// Animation variants


const childPackage = {
    hidden: { y: 50 },
    show: { y: 0 }
};

const childGuide = {
    hidden: { y: 50 },
    show: { y: -36 }
};



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

            <section className="px-4 md:px-8 lg:px-16 w-7/12 mx-auto flex flex-col gap-8">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-3xl font-semibold text-accent flex items-center gap-2">
                        Explore
                        <div className="relative capitalize text-primary h-8 w-44 overflow-hidden">
                            <AnimatedTabWord word={TABS.package} variants={childPackage} isActive={tab === TABS.package} />
                            <AnimatedTabWord word={TABS.guide} variants={childGuide} isActive={tab === TABS.guide} />
                        </div>
                    </h1>
                    <p className="text-sm text-text/55">
                        {isLoading ? "Loading..." : `${data?.total || 0} ${tab}s available`}
                    </p>
                </motion.header>

                {/* Tabs */}
                <motion.section
                    className="w-full h-12 flex flex-col justify-end gap-1 overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="flex gap-2">
                        {Object.keys(TABS).map(_tab => (
                            <button
                                key={_tab}
                                onClick={() => handleTabChange(_tab)}
                                className={`${tab === _tab ? "bg-primary/25 text-accent font-semibold " : ""} hover:bg-primary/15 px-4 py-2 rounded-lg cursor-pointer capitalize`}
                            >
                                {_tab}
                            </button>
                        ))}
                    </div>
                    <div className="w-full h-0.5 bg-secondary rounded-full" />
                </motion.section>

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

            {/* Results grid */}
            <section className={`grid gap-14 ${tab === "package" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5" : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6" } w-full justify-items-center`}>
                {isLoading
                    ? <h1>Loading</h1>
                    : tab === "package" ?
                        data?.docs?.map(item => <PackageCard key={item._id} item={item} />)
                        :
                        data?.docs?.map(guide => <GuideProfileCard key={guide._id} guide={guide} />)
                }
            </section>

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