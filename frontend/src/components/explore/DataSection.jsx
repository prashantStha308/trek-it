import {motion} from "motion/react";

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE
} from "@/constants/config.constants.js"

import PackageCard from "@/components/package/PackageCard.jsx";
import GuideProfileCard from "@/components/guide/GuideProfileCard.jsx";

import LoadingSection from "@/components/loaders/LoadingSection"


const containerVarient = {
    hidden: {
        opacity: 0.25,
    },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.065,
        type: "spring",
        stiffness: 120,
        damping: 8
    },
    },
};

const childVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function DataSection({
	id, label,
	data, isLoading,
    card="package",
	slice = 8,
	query = ()=>({}),
	queryArgs = { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT},
    gridColsClasses = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
}){

    const { data: queryData, isLoading:dataLoading } = query ? query(queryArgs) : {};
    const targetData = data ?? queryData?.docs?.slice(0, slice) ?? [];

    const isDataLoading = isLoading || dataLoading;

	return(
		<motion.section
            initial="hidden"
            whileInView="visible"
            animate={isDataLoading ? "hidden" : "visible"}
            variants={containerVarient}
            viewport={{ amount: 0.1}}

			id={id}
			className={`flex flex-col items-center w-full gap-4 px-5`}
		>
            <h2
                className='text-text text-2xl font-bold text-left w-full'
            >
                {label}
            </h2>

            {
                isDataLoading ? <LoadingSection card={card} /> :(
                    
                    <section
                        className={`w-full grid gap-8 ${gridColsClasses} justify-items-center`}
                    >
                        {
                            targetData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={childVarient}
                                >
                                    {
                                        card === "package" ? (
                                            <PackageCard item={item} key={index}  />
                                        ) : (
                                            <GuideProfileCard item={item} key={index}  />
                                        )
                                    }
                                </motion.div>
                            ))
                        }
                    </section>
                )
            }

		</motion.section>
	)
}