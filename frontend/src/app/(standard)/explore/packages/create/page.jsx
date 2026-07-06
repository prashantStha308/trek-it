"use client"
import { useState } from "react"
import {useRouter} from "next/navigation"

import { useCreatePackage } from "@/queries/package.query.js"
import {validatePackageCreationFormData} from "@/utils/validators.js";
import { showToast } from "@/store/ui.store";


import { Button } from "@/components/ui/Button";
import InfoRow from "@/components/ui/InfoRow";
import Spinner from "@/components/loaders/Spinner";

import TextInput from "@/components/input/TextInput";
import TagInput from "@/components/input/TagInput";
import TextArea from "@/components/input/TextArea";
import Toggle from "@/components/input/Toggle";

import ItineraryBuilder from "@/components/package/ItineraryBuilder";
import ImageUploader from "@/components/package/ImageUploader";



export default function CreatePackagePage() {
    const createPackage = useCreatePackage();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        description: "",

        keywords: [],
        activities: [],

        minGroupSize: 0,
        maxGroupSize: 0,
        pricePerPerson: 0,
        daysAlloted: 0,

        requiresPermit: false,
        permitDetails: "",

        stops: [],

        images: [],
        thumbnail: undefined
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validatePackageCreationFormData(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        createPackage.mutate(formData,{
            onSuccess: (res) => {
                showToast({
                    message: res.message || "Package created"
                });

                router.push("/");
            },
            onError:(err) => {
                showToast({
                    title: "Failed",
                    message: err.message || "Package failed to be created"
                })
            }
        });


    }

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleToggle = (fieldName) => {
        setFormData(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };

    const set = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));

        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    return (
        <section className="bg-white dark:bg-secondary/15 border border-border rounded-lg p-4 flex flex-col gap-4">

            {createPackage.isPending && <Spinner />}

            <header className="text-center">
                <h1 className="text-2xl font-bold text-primary">Create New Package</h1>
                <p className="text-sm text-text/50 mt-1">Fill in the details to list a new trekking package</p>
            </header>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Basic Info</legend>

                    <TextInput
                        type="text"
                        name="name"
                        id="name"
                        label="Package Name"
                        placeholder="E.g. Annapurna Trek"
                        value={formData.name}
                        handleChange={handleChange}
                        error={errors.name}
                    />

                    <TextArea
                        name="description"
                        id="description"
                        label="Description:"
                        placeholder="Describe your package..."
                        rows={4}
                        value={formData.description}
                        handleChange={handleChange}
                        error={errors.description}
                    />

                    <TagInput
                        label="Keywords (press Enter to add; more keywords improve visibility)"
                        tags={formData.keywords}
                        onChange={(value) => set("keywords", value)}
                        placeholder="adventure, scenic, cultural..."
                        error={errors.keywords}
                    />

                    <TagInput
                        label="Activities (press Enter to add; more activities improve visibility)"
                        tags={formData.activities}
                        onChange={(value) => set("activities", value)}
                        placeholder="rafting, trekking, bungee jumping..."
                        error={errors.activities}
                    />
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Pricing & Logistics</legend>

                    <div className="grid grid-cols-2 gap-3">
                        <TextInput
                            type="number"
                            name="minGroupSize"
                            label="Min Group Size"
                            placeholder="1"
                            value={formData.minGroupSize}
                            handleChange={handleChange}
                            error={errors.minGroupSize}
                        />

                        <TextInput
                            type="number"
                            name="maxGroupSize"
                            label="Max Group Size"
                            placeholder="0"
                            value={formData.maxGroupSize}
                            handleChange={handleChange}
                            error={errors.maxGroupSize}
                        />

                        <TextInput
                            type="number"
                            name="pricePerPerson"
                            label="Price per Person (In NRS)"
                            placeholder="0"
                            value={formData.pricePerPerson}
                            handleChange={handleChange}
                            error={errors.pricePerPerson}
                        />

                        <TextInput
                            type="number"
                            name="daysAlloted"
                            label="Duration (days)"
                            placeholder="0"
                            value={formData.daysAlloted}
                            handleChange={handleChange}
                            error={errors.daysAlloted}
                        />
                    </div>

                    <Toggle
                        label="Requires Permit"
                        description="Does this trek require a government permit?"
                        value={formData.requiresPermit}
                        onToggle={() => handleToggle("requiresPermit")}
                    />

                    {formData.requiresPermit && (
                        <TextInput
                            name="permitDetails"
                            label="Permit Details"
                            placeholder="E.g. TIMS card + ACAP permit required"
                            value={formData.permitDetails}
                            handleChange={handleChange}
                        />
                    )}
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Itinerary</legend>

                    <ItineraryBuilder
                        stops={formData.stops}
                        daysAlloted={Number(formData.daysAlloted)}
                        onChange={(value) => set("stops", value)}
                    />

                    {errors.stops && (
                        <p className="text-xs text-red-500 pl-1">{errors.stops}</p>
                    )}
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Photos</legend>

                    <ImageUploader
                        onChange={({ thumbnail, images }) => {
                            set("thumbnail", thumbnail);
                            set("images", images);
                        }}
                    />

                    {errors.thumbnail && (
                        <p className="text-xs text-red-500 pl-1">{errors.thumbnail}</p>
                    )}
                </fieldset>

                <fieldset>
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Summary</legend>

                    <div className="px-2">
                        <InfoRow label="Destinations" value={`${formData.stops.length} stops`} />
                        <InfoRow label="Duration" value={`${formData.daysAlloted} day/s`} />
                        <InfoRow label="Group Size Range" value={`${formData.minGroupSize} - ${formData.maxGroupSize}`} />
                        <InfoRow label="Price Per Person" value={`NRs. ${formData.pricePerPerson} / p`} />
                        <InfoRow label="Starting Price (Min group × Price per person)" value={`NRs. ${formData.minGroupSize * formData.pricePerPerson || 0}`} />
                        <InfoRow label="Permit Required" value={formData.requiresPermit ? `Yes — ${formData.permitDetails || "details not specified"}` : "No"} />
                    </div>
                </fieldset>

                {Object.keys(errors).length > 0 && (
                    <p className="text-xs text-red-500 text-center">
                        Please fix the errors above before submitting.
                    </p>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                >
                    Create Package
                </Button>

            </form>

        </section>
    );
}