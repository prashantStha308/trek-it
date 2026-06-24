import React from 'react'
import { PackageCard } from './PackageCard'
// import pkg from "../../../../data_store/mockPackage.js";

const PackageList = ({label = "Packages", query, ...props}) => {

    const { data = [], isLoading, isError, error } = query;

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (isError) {
        return <h1>{error?.message}</h1>
    }

    console.log(data);

    return (
        <section
            id='package-list'
            className='flex flex-col items-center w-full gap-4 px-5 '
            {...props}
        >
            <h2
                className='text-neutral-800 dark:text-neutral-300 text-2xl font-bold text-left w-full'
            >
                {label}
            </h2>

            <section
                className='w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center'
            >
                {
                    // pkgs.slice(0,4).map((p, index) => (
                    data?.docs?.map((pkg, index) => (
                        <PackageCard item={pkg} key={index} />
                    ))
                }
            </section>
        </section>
    )
}

export default PackageList