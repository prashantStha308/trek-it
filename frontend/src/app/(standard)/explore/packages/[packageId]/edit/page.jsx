"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetPackageById, useUpdatePackage } from "@/queries/package.query";
import { useGetMe } from "@/queries/auth.query.js";
import { validatePackageCreationFormData } from "@/utils/validators.js";
import { showToast } from "@/store/ui.store";

import { Button } from "@/components/ui/Button";
import InfoRow from "@/components/ui/InfoRow";
import Spinner from "@/components/loaders/Spinner";
import LoadingSection from "@/components/loaders/LoadingSection";

import TextInput from "@/components/input/TextInput";
import TagInput from "@/components/input/TagInput";
import TextArea from "@/components/input/TextArea";
import Toggle from "@/components/input/Toggle";

import ItineraryBuilder from "@/components/package/ItineraryBuilder";
import ImageUploader from "@/components/package/ImageUploader";
import Image from "next/image";

const buildPackageFormData = (body, replacingPhotos) => {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("pricePerPerson", body.pricePerPerson);
    formData.append("minGroupSize", body.minGroupSize);
    formData.append("maxGroupSize", body.maxGroupSize);
    formData.append("daysAlloted", body.daysAlloted);
    formData.append("requiresPermit", body.requiresPermit);
    formData.append("permitDetails", body.permitDetails);
    formData.append("keywords", JSON.stringify(body.keywords));
    formData.append("activities", JSON.stringify(body.activities));
    formData.append("stops", JSON.stringify(body.stops));

    // Only attach files when the guide chose to replace photos.
    // Backend replaces the whole set if any files are present, and
    // leaves existing images/thumbnail untouched if none are sent.
    if (replacingPhotos) {
        if (body.thumbnail) formData.append("thumbnail", body.thumbnail);
        (body.images || []).forEach((image) => formData.append("images", image));
    }

    return formData;
};

export default function EditPackagePage() {
    const { packageId } = useParams();
    const router = useRouter();

    const { data: me, isLoading: meLoading } = useGetMe();
    const { data: pkg, isLoading: pkgLoading } = useGetPackageById(packageId);
    const updatePackage = useUpdatePackage();

    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({});
    const [replacingPhotos, setReplacingPhotos] = useState(false);

    useEffect(() => {
        if (pkg && !formData) {
            setFormData({
                name: pkg.name ?? "",
                description: pkg.description ?? "",
                keywords: pkg.keywords ?? [],
                activities: pkg.activities ?? [],
                minGroupSize: pkg.minGroupSize ?? 0,
                maxGroupSize: pkg.maxGroupSize ?? 0,
                pricePerPerson: pkg.pricePerPerson ?? 0,
                daysAlloted: pkg.daysAlloted ?? 0,
                requiresPermit: pkg.requiresPermit ?? false,
                permitDetails: pkg.permitDetails ?? "",
                stops: pkg.stops ?? [],
                images: [],
                thumbnail: undefined,
            });
        }
    }, [pkg, formData]);

    useEffect(() => {
        if (!meLoading && !pkgLoading && pkg && me && pkg.guide?._id !== me._id) {
            router.replace("/");
            showToast({
                title: "Unauthorized action",
                message: "You are not permitted to perform this action",
            });
        }
    }, [meLoading, pkgLoading, pkg, me, router]);

    if (meLoading || pkgLoading || !formData) return <LoadingSection />;

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validatePackageCreationFormData(formData, {
            requireThumbnail: replacingPhotos,
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const body = buildPackageFormData(formData, replacingPhotos);

        updatePackage.mutate(
            { id: packageId, body },
            {
                onSuccess: (res) => {
                    showToast({ message: res.message || "Package updated" });
                    router.push(`/explore/packages/${packageId}`);
                },
                onError: (err) => {
                    showToast({
                        title: "Failed",
                        message: err.message || "Package failed to update",
                    });
                },
            }
        );
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleToggle = (fieldName) => {
        setFormData((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };

    const set = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    return (
        <section className="bg-white dark:bg-secondary/15 border border-border rounded-lg p-4 flex flex-col gap-4">
            {updatePackage.isPending && <Spinner />}

            <header className="text-center">
                <h1 className="text-2xl font-bold text-primary">Edit Package</h1>
                <p className="text-sm text-text/50 mt-1">Update the details of your trekking package</p>
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
                            value={formData.minGroupSize}
                            handleChange={handleChange}
                            error={errors.minGroupSize}
                        />
                        <TextInput
                            type="number"
                            name="maxGroupSize"
                            label="Max Group Size"
                            value={formData.maxGroupSize}
                            handleChange={handleChange}
                            error={errors.maxGroupSize}
                        />
                        <TextInput
                            type="number"
                            name="pricePerPerson"
                            label="Price per Person (In NRS)"
                            value={formData.pricePerPerson}
                            handleChange={handleChange}
                            error={errors.pricePerPerson}
                        />
                        <TextInput
                            type="number"
                            name="daysAlloted"
                            label="Duration (days)"
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

                    {errors.stops && <p className="text-xs text-red-500 pl-1">{errors.stops}</p>}
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-semibold text-text/50 uppercase tracking-wide pb-2">Photos</legend>

                    {!replacingPhotos && (
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-3 gap-2">
                                {pkg.thumbnail?.src && (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-primary">
                                        <Image
                                            width={400}
                                            height={700}
                                            src={pkg.thumbnail.src}
                                            alt="Current thumbnail"
                                            className="w-full h-56 object-cover"
                                            unoptimized
                                        />
                                        <span className="absolute top-1 left-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-md font-medium">
                                            Thumbnail
                                        </span>
                                    </div>
                                )}
                                {(pkg.images || []).map((img) => (
                                    <div
                                        key={img._id}
                                        className="relative rounded-lg overflow-hidden border-2 border-border"
                                    >
                                        <Image
                                            width={400}
                                            height={700}
                                            src={img.src}
                                            alt="Existing package photo"
                                            className="w-full h-56 object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-fit"
                                onClick={() => setReplacingPhotos(true)}
                            >
                                Replace Photos
                            </Button>
                        </div>
                    )}

                    {replacingPhotos && (
                        <div className="flex flex-col gap-3">
                            <p className="text-xs text-text/50">
                                Uploading new photos replaces all current photos and the thumbnail for this package.
                            </p>

                            <ImageUploader
                                onChange={({ thumbnail, images }) => {
                                    set("thumbnail", thumbnail);
                                    set("images", images);
                                }}
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-fit"
                                onClick={() => {
                                    setReplacingPhotos(false);
                                    set("thumbnail", undefined);
                                    set("images", []);
                                }}
                            >
                                Keep Existing Photos
                            </Button>
                        </div>
                    )}

                    {errors.thumbnail && <p className="text-xs text-red-500 pl-1">{errors.thumbnail}</p>}
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
                    <p className="text-xs text-red-500 text-center">Please fix the errors above before submitting.</p>
                )}

                <Button type="submit" variant="primary" size="lg" className="w-full">
                    Save Changes
                </Button>
            </form>
        </section>
    );
}