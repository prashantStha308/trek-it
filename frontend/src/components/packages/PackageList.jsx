import React from 'react'
import { PackageCard } from './PackageCard'
// import pkg from "../../../../data_store/mockPackage.js";

const PackageList = ({pkgs = [], label = "Packages"}) => {

    return (
        <section
            id='package-list'
            className='flex flex-col items-center w-full gap-4 px-5 '
        >
            <h2
                className='text-neutral-800 text-2xl font-bold text-left w-full'
            >
                {label}
            </h2>

            <section
                className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
            >
                {
                    // pkgs.slice(0,4).map((p, index) => (
                    pkgs.map((p, index) => (
                        <PackageCard item={p} key={index} />
                    ))
                }
            </section>
        </section>
    )
}

export default PackageList