"use client"

import { Button } from "@/components/ui/Button";
import TextInput from "@/components/input/TextInput";
import SelectInput from "@/components/input/SelectInput";
import ListBox from "@/components/input/ListBox";

import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import { FolderPen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function TouristLevel3({handleChange, formData, listItems, isListLoading}) {

    const [selected, setSelected] = useState(formData.interests);

    const toggleSelection = (item) => {
        const newSelected = selected.find(i => i === item)
            ? selected.filter(i => i !== item)
            : [...selected, item];

        setSelected(newSelected);
        handleChange({
            target: {
                name: "interests",
                value: newSelected
            }
        });
    };

    return (
        <section
            className="flex flex-1 justify-between flex-col gap-5 px-6 sm:px-12 lg:px-20 gap-10 pb-10"
        >

            <section
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-text font-bold text-lg lg:text-xl xl:text-3xl text-center" >
                    Select your Interests
                </h1>
            </section>

            <section
                className="w-full h-52 2xl:h-72"
            >
            	<ListBox
                    handleSelect = {toggleSelection}
                    selected={selected}
    			    listItems = { isListLoading ? [] : listItems }
            	/>
            </section>

        </section>
    )
}