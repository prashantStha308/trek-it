"use client"
import {motion, AnimatePresence} from "motion/react";
import {useState, useRef} from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchQuery, useGetAllPackages } from "@/queries/package.query";

import SearchBar2 from "@/components/explore/SearchBar2";
import SelectInput from "@/components/input/SelectInput";
import {PackageCard} from "@/components/package/PackageCard.jsx"


const FILTER_OPTIONS = [
    {label: "Recommended", value: "recommended"},
    {label: "Ascending", value: "ascending"},
    {label: "Descending", value: "descending"},
]

const REGIONS = [
    "Everest", "Annapurna", "Langtang", "Manaslu", "Mustang",
    "Kanchenjunga", "Dhaulagiri", "Dolpo", "Rara", "Chitwan",
];

const ACTIVITIES = [
    "trekking", "camping", "climbing", "rafting", "paragliding",
    "cycling", "cultural", "wildlife", "photography", "yoga",
];


function FilterPill({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-75 ease-in-out cursor-pointer whitespace-nowrap ${
                active
                    ? "bg-primary text-white border-primary"
                    : "bg-secondary/75 text-text/70 border-black/10 hover:border-green-600 hover:text-primary"
            }`}
        >
            {label}
        </button>
    );
}


function Filters({filter, setFilter}) {
    const toggleFilter = (type, value) => {
        setFilter(prev => {
            const current = prev[type];
            const exists = current.includes(value);
            return {
                ...prev,
                [type]: exists
                    ? current.filter(item => item !== value)
                    : [...current, value]
            };
        });
    };

    return (
        <motion.section
            initial={{ height: 0 }}
            animate={{ height: "16rem" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex flex-col gap-4 px-4 overflow-hidden relative"
        >
            <section className="flex flex-col justify-start gap-2">
                <span className="text-text/65 text-xs pl-2">Regions</span>
                <div className="flex flex-wrap gap-2">
                    {REGIONS.map((item, index) => (
                        <FilterPill
                            key={index}
                            label={item}
                            active={filter.regions.includes(item)}
                            onClick={() => toggleFilter("regions", item)}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col justify-start gap-2">
                <span className="text-text/65 text-xs pl-2">Activities</span>
                <div className="flex flex-wrap gap-2">
                    {ACTIVITIES.map((item, index) => (
                        <FilterPill
                            key={index}
                            label={item}
                            active={filter.activities.includes(item)}
                            onClick={() => toggleFilter("activities", item)}
                        />
                    ))}
                </div>
            </section>
        </motion.section>
    );
}


export default function ExplorePage(){
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState(FILTER_OPTIONS[0].value);
    const debounce = useRef(null);

    const [filter, setFilter] = useState({ regions: [], activities: [], name: "" });

    const hasFilters = !!(search || filter.regions.length || filter.activities.length);

    const { data: searchData, isLoading: searchLoading } = useSearchQuery(filter);
    const { data: allData, isLoading: allLoading } = useGetAllPackages({ page });

    const data = hasFilters ? searchData : allData;
    const isLoading = hasFilters ? searchLoading : allLoading;

    const handleSearchWords = (e) => {
        const value = e.target.value;
        setSearch(value);

        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            setFilter(prev => ({ ...prev, name: value }));
        }, 300);
    };

    return(
        <section className="h-full flex flex-col items-center gap-20">

            {/*Search panel*/}
            <section className="px-4 md:px-8 lg:px-16 w-7/12 mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-text mb-1">Explore Packages</h1>
                    <p className="text-sm text-text/55">
                        {isLoading ? "Loading..." : `${data?.total || 0} packages available`}
                    </p>
                </motion.header>

                <motion.section className="flex flex-col gap-8">
                    <div className="flex gap-4 items-center">
                        <SearchBar2
                            value={search}
                            onChange={handleSearchWords}
                        />

                        <button
                            className={`flex items-center justify-between gap-2 cursor-pointer text-text/75 text-sm px-2 py-1 border rounded-lg hover:bg-primary hover:text-white/75 ${showFilters ? "border-primary bg-primary text-white/75" : "border-secondary/75 bg-primary/15"}`}
                            onClick={() => setShowFilters((prev) => !prev)}
                        >
                            <SlidersHorizontal size={14} />
                            <span>Filters</span>
                        </button>

                        <SelectInput
                            className="w-44"
                            optionObjArray={FILTER_OPTIONS}
                            value={sortBy}
                            handleChange={(e) => setSortBy(e.target.value)}
                        />
                    </div>

                    <AnimatePresence>
                        {showFilters && <Filters filter={filter} setFilter={setFilter} />}
                    </AnimatePresence>
                </motion.section>
            </section>

            {/*Render packages*/}
            <section className="grid gap-14 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-full justify-items-center">
                {isLoading
                    ? <h1>Loading</h1>
                    : data?.docs?.map(pkg => <PackageCard key={pkg._id} item={pkg} />)
                }
            </section>

        </section>
    )
}