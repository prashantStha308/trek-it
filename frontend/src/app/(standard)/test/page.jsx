"use client"

import {useState} from "react";

import CitySelector from "@/components/input/CitySelector";
import CountrySelector from "@/components/input/CountrySelector";


export default function Test() {

    const [city, setCity] = useState();
    const [country, setCountry] = useState();


    return (
        <section
            className="h-screen w-full flex flex-col gap-8 justify-center items-center"
        >
            <section className="flex gap-4 text-xs" >

                <section className="border border-secondary rounded-lg bg-secondary/15 px-4 py-1">
                    <span> City: </span>
                    <span> {JSON.stringify(city) ?? "Select a city"} </span>
                </section>

                <section className="border border-secondary rounded-lg bg-secondary/15 px-4 py-1">
                    <span> Country: </span>
                    <span> {JSON.stringify(country) ?? "Select a country"} </span>
                </section>

            </section>

            <section>
                <CitySelector city={city} setCity={setCity} />

                <CountrySelector country={country} setCountry={setCountry} />

            </section>

        </section>
    )
}