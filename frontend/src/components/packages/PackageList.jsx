import React from 'react'
import { PackageCard } from './PackageCard'
import pkg from "../../../../data_store/mockPackage.js";

const PackageList = () => {

    return (
        <section
            id='package-list'
            className='flex flex-col items-center w-full '
        >

            <section
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'
            >
                {
                    pkg.slice(0,4).map((p, index) => (
                        <PackageCard item={p} key={index} />
                    ))
                }
            </section>
        </section>
    )
}

export default PackageList