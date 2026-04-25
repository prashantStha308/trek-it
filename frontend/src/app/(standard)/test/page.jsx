"use client"

import { getAllPackages } from "@/api/package.api"
import PackageList from "@/components/packages/PackageList"
import { useEffect, useState } from "react"


export default function Test() {
    const [pkgs, setPkgs] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllPackages();
            console.log(res);
            console.log(res.data.docs);

            setPkgs(res.data.docs);
        }
        fetch();
    }, []);

    return (
        <section>
            <PackageList pkgs={pkgs} />       
        </section>
    )
}