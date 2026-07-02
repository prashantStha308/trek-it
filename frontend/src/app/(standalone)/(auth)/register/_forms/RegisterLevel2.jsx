"use client"
import {useState} from "react";
import Link from "next/link";

import {
    Eye,
    Globe,
    Mail,
    FolderPen,
    MapPin,
    UserKey
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import TextInput from "@/components/input/TextInput";
import SelectInput from "@/components/input/SelectInput";
import CountrySelector from "@/components/input/CountrySelector";


export default function RegisterLevel2({ handleChange, formData}) {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const handleCountry = (country) => {
        setSelectedCountry(country)
        handleChange({ target: { name: "address.country", value: country.name } })
    }

    return (
        <section className="flex flex-1 justify-between flex-col gap-5 px-6 sm:px-12 lg:px-20 gap-10 pb-10">

            <section
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-text font-bold text-lg lg:text-xl xl:text-3xl text-center" >
                    Roles and Address
                </h1>
            </section>

            <section
                className="flex flex-col gap-6 overflow-scroll"
            >

                <SelectInput
                    id={"role"}
                    name={"role"}
                    label={"Role"}
                    optionObjArray={[
                        { label: "Tourist", value: "tourist" },
                        { label: "Guide", value: "guide" },
                    ]}
                    handleChange={handleChange}
                    value={formData.role}
                    leftIcon={<UserKey size={16} />}
                    className="w-full"
                />

                    <CountrySelector
                        country={selectedCountry}
                        setCountry={handleCountry}
                    />


                	<TextInput
                		type={"text"}
                		id={"city"}
                		name={"address.city"}
                		label={"City"}
                		placeholder={"Enter your city..."}
                		handleChange={handleChange}
	                    value={formData.address.city}
                		leftIcon={<MapPin size={16} />}
                	/>
            </section>
        </section>
    )
}