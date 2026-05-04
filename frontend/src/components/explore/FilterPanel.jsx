import {motion} from "motion/react";
import { useGetRegions, useGetActivities } from "@/queries/meta.query";


export const FilterPill = ({ label, active, onClick }) => {
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

export const FilterPillSkeleton = ()=>{
    return(

        <motion.div>
            
        </motion.div>
    )
}


export const FilterPanel = ({filter, setFilter}) => {

    // Queries
    const { data: regions, isLoading: regionsLoading, isError: regionsIsError, error: regionsError } = useGetRegions();
    const { data: activities, isLoading: activitiesLoading, isError: activitiesIsError, error: activitiesError } = useGetActivities();

    console.log("regions res: ", regions);
    console.log("activities res: ", activities);


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
            animate={{ height: "12rem" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex flex-col gap-4 px-4 overflow-hidden relative"
        >
            <section className="flex flex-col justify-start gap-2">
                <span className="text-text/65 text-xs pl-2">Regions</span>
                <div className="flex flex-wrap gap-2">
                    {
                        regionsLoading ? 
                        "Loading..." 
                        :
                        regions.map((item, index) => (
                            <FilterPill
                                key={index}
                                label={item}
                                active={filter.regions.includes(item)}
                                onClick={() => toggleFilter("regions", item)}
                            />
                        ))
                    }
                </div>
            </section>

            <section className="flex flex-col justify-start gap-2">
                <span className="text-text/65 text-xs pl-2">Activities</span>
                <div className="flex flex-wrap gap-2">
                    {
                        activitiesLoading ?
                        "Loading..."
                        :
                        activities.map((item, index) => (
                            <FilterPill
                                key={index}
                                label={item}
                                active={filter.activities.includes(item)}
                                onClick={() => toggleFilter("activities", item)}
                            />
                        ))
                    }
                </div>
            </section>
        </motion.section>
    );
}
