import {
    motion,
    AnimatePresence,
} from "motion/react";
import {
    SlidersHorizontal,
} from "lucide-react"

import {FilterPanel} from "./FilterPanel";
import SearchBar from "./SearchBar";


export default function SearchPanel({ search, onChange, showFilters, setShowFilters, filter, setFilter, tab, metaData, isMetaLoading }) {
    
    return(
        <motion.section className="flex flex-col gap-8">
            <div className="flex gap-4 items-center">

                <SearchBar value={search} onChange={onChange} />
                
                <button
                    className={`flex items-center gap-2 text-sm px-4 py-2 border rounded-lg cursor-pointer hover:border-primary ${
                        showFilters ? "border-primary bg-primary text-white/75" : "border-secondary/75 bg-primary/5"
                    }`}
                    onClick={() => setShowFilters(prev => !prev)}
                >
                    <SlidersHorizontal size={14} />
                    <span>Filters</span>
                </button>
            </div>
            <AnimatePresence>
                {showFilters && <FilterPanel filter={filter} setFilter={setFilter} tab={tab} metaData={metaData} isMetaLoading={isMetaLoading} />}
            </AnimatePresence>
        </motion.section>
    )
};