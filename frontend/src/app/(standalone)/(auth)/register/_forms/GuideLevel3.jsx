"use client"

import { Button } from "@/components/ui/Button";
import { SelectInput, TextInput, ListBox } from "@/components/ui/Input";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import { FolderPen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


// languages:[],
// regions: [],
// specialities: []
// Experience: []
// liscense details


export default function TouristLevel3({handleNext, handleChange, formData}) {


    return (
        <section
            className="flex flex-1 justify-between flex-col px-6 sm:px-12 lg:px-20 gap-10 pb-10"
        >

            <section
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-text font-bold text-lg lg:text-xl xl:text-3xl text-center" >
                    Setup your guide details
                </h1>
            </section>

            <section
                className="w-full h-52 2xl:h-72 flex flex-col gap-4 "
            >

            </section>
            
            <Button type={"submit"} text="Complete Registration" variant="form" />

        </section>
    )
}