"use client"

import TextInput from "@/components/input/TextInput";
import TagInput from "@/components/input/TagInput";

import {
    Languages,
    MapPinned,
    BriefcaseBusiness,
    BadgeCheck
} from "lucide-react";


const InfoLabel = ({info})=>{
    return (
        <span className="text-xs text-text/75 font-normal" >
            {info || "(press Enter to add)" }
        </span>
    )
}

export default function GuideLevel3({ handleChange, formData }) {

    const handleTagChange = (field, value) => {
        handleChange({
            target: {
                name: field,
                value
            }
        });
    };

    return (
        <section
            className="flex flex-1 justify-between flex-col px-6 sm:px-12 lg:px-20 gap-10 pb-10"
        >

            {/* Header */}
            <section
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-text font-bold text-lg lg:text-xl xl:text-2xl text-center">
                    Setup your Guide Details
                </h1>

                <p className="text-sm text-text/60 text-center">
                    Add your guiding experience and specialties
                </p>
            </section>

            {/* Form */}
            <section
                className="w-full flex flex-col gap-6 overflow-y-auto"
            >

                {/* Languages */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text flex items-center gap-2">
                        <Languages size={16} />
                        Languages <InfoLabel />
                    </label>

                    <TagInput
                        tags={formData.languages}
                        onChange={(value) =>
                            handleTagChange("languages", value)
                        }
                        placeholder="Add languages (e.g English, Nepali)"
                    />
                </div>

                {/* Regions */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text flex items-center gap-2">
                        <MapPinned size={16} />
                        Operating Regions <InfoLabel />
                    </label>

                    <TagInput
                        tags={formData.regions}
                        onChange={(value) =>
                            handleTagChange("regions", value)
                        }
                        placeholder="Add regions (e.g Everest, Pokhara)"
                    />
                </div>

                {/* Specialities */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text flex items-center gap-2">
                        <BriefcaseBusiness size={16} />
                        Specialities <InfoLabel />
                    </label>

                    <TagInput
                        tags={formData.specialities}
                        onChange={(value) =>
                            handleTagChange("specialities", value)
                        }
                        placeholder="Add specialities (e.g Trekking, Wildlife)"
                    />
                </div>

                {/* Experience */}
                <TextInput
                    type={"number"}
                    id={"experience"}
                    name={"experience"}
                    label={"Years of Experience"}
                    placeholder={"Enter years of experience"}
                    handleChange={handleChange}
                    value={formData.experience || ""}
                    leftIcon={<BadgeCheck size={16} />}
                />

            </section>

        </section>
    )
}