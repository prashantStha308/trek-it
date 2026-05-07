"use client"
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal } from "lucide-react";

import SearchBar2 from "@/components/explore/SearchBar2";
import { PackageCard } from "@/components/package/PackageCard.jsx";
import GuideProfileCard from "@/components/guide/GuideProfileCard.jsx";
import { FilterPanel } from "@/components/explore/FilterPanel.jsx";
import { useExploreState, TABS } from "@/hooks/useExploreState";

// Animation variants
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
};

const childPackage = {
    hidden: { y: 50 },
    show: { y: 0 }
};

const childGuide = {
    hidden: { y: 50 },
    show: { y: -36 }
};

// Sub component
const SearchPanel = ({ search, onChange, showFilters, setShowFilters, filter, setFilter, tab }) => (
    <motion.section className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
            <SearchBar2 value={search} onChange={onChange} />
            <button
                className={`flex items-center gap-2 text-sm px-4 py-2 border rounded-lg cursor-pointer hover:border-primary ${
                    showFilters ? "border-primary bg-primary text-white/75" : "border-secondary/75 bg-primary/15"
                }`}
                onClick={() => setShowFilters(prev => !prev)}
            >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
            </button>
        </div>
        <AnimatePresence>
            {showFilters && <FilterPanel filter={filter} setFilter={setFilter} tab={tab} />}
        </AnimatePresence>
    </motion.section>
);

const AnimatedTabWord = ({ word, variants, isActive }) => (
    <motion.div
        variants={container}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
    >
        {word.split("").map((char, index) => (
            <motion.span
                key={index}
                variants={variants}
                className="inline-block"
                transition={{ type: "spring", stiffness: 80, damping: 10 }}
            >
                {char}
            </motion.span>
        ))}
    </motion.div>
);



// Main Page
export default function ExplorePage() {
    const {
        tab, handleTabChange,
        currentSearch, handleSearchWords,
        currentFilter, setCurrentFilter,
        currentShowFilters, setCurrentShowFilters,
        data, isLoading,
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
                    <h1 className="text-3xl font-semibold text-text flex items-center gap-2">
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
                                className={`${tab === _tab ? "bg-primary/25" : ""} hover:bg-primary/15 px-4 py-2 rounded-lg cursor-pointer capitalize`}
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