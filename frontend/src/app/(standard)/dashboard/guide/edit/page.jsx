"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/queries/auth.query";
import { useUpdateGuideProfile } from "@/queries/guide.query";

import ImageUploader from "@/components/package/ImageUploader";
import TextInput from "@/components/input/TextInput";
import TextArea from "@/components/input/TextArea";
import TagInput from "@/components/input/TagInput";

import { Button } from "@/components/ui/Button";
import LoadingSection from "@/components/loaders/LoadingSection";

import {showToast} from "@/store/ui.store.js";

export default function EditGuideProfilePage() {
    const router = useRouter();

    const { data: guide, isLoading } = useGetMe();
    const updateProfile = useUpdateGuideProfile();

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (!guide) return;

        setForm({
            name: guide.name ?? "",
            aboutMe: guide.aboutMe ?? "",
            profilePicture: guide.profilePicture ?? null,
            languages: guide.languages ?? [],
            regions: guide.regions ?? [],
            specialities: guide.specialities ?? [],
        });
    }, [guide]);

    if (isLoading || !form) {
        return <LoadingSection />;
    }

    const handleFieldChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateProfile.mutate(
            {
                id: guide._id,
                ...form,
            },
            {
                onSuccess: (res) => {
                    router.push("/dashboard");
                    showToast({
                        title: "Success",
                        message: res.message ?? "Updated profile"
                    })
                },
                onError: (err) =>{
                    showToast({
                        title: "Failed",
                        message: err.message ?? "Failed to updated profile"
                    })   
                }
            }
        );
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-primary/5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800">
                    <h1 className="text-xl font-semibold">
                        Edit Profile
                    </h1>

                    <p className="text-sm text-neutral-500 mt-1">
                        This is what tourists see when they view your profile.
                    </p>
                </div>

                {/* Profile Photo */}
                <div className="px-8 py-6 flex items-center gap-5 border-b border-neutral-100 dark:border-neutral-800">
                    <ImageUploader
                        value={form.profilePicture}
                        maxImage={1}
                        onChange={(img) =>
                            handleFieldChange("profilePicture", img)
                        }
                    />

                    <div>
                        <p className="text-sm font-medium">
                            Profile Photo
                        </p>

                        <p className="text-xs text-neutral-500">
                            Clear face photos help tourists recognize and trust
                            you.
                        </p>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="px-8 py-6 flex flex-col gap-5 border-b border-neutral-100 dark:border-neutral-800">
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        value={form.name}
                        handleChange={(e) =>
                            handleFieldChange("name", e.target.value)
                        }
                    />

                    <TextArea
                        label="About Me"
                        placeholder="Tell tourists about yourself, your guiding experience, and what makes trekking with you memorable."
                        value={form.aboutMe}
                        handleChange={(e) =>
                            handleFieldChange("aboutMe", e.target.value)
                        }
                        rows={5}
                    />
                </div>

                {/* Languages */}
                <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Languages
                        </label>

                        <p className="text-xs text-neutral-500 mb-2">
                            Languages you can communicate in.
                        </p>

                        <TagInput
                            tags={form.languages}
                            onChange={(languages) =>
                                handleFieldChange(
                                    "languages",
                                    languages
                                )
                            }
                        />
                    </div>
                </div>

                {/* Regions */}
                <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Trekking Regions
                        </label>

                        <p className="text-xs text-neutral-500 mb-2">
                            Add the trekking regions you guide in.
                        </p>

                        <TagInput
                            tags={form.regions}
                            onChange={(regions) =>
                                handleFieldChange(
                                    "regions",
                                    regions
                                )
                            }
                        />
                    </div>
                </div>

                {/* Specialities */}
                <div className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Specialities
                        </label>

                        <p className="text-xs text-neutral-500 mb-2">
                            Add your guiding expertise such as high-altitude
                            trekking, climbing, camping, photography, wildlife,
                            etc.
                        </p>

                        <TagInput
                            tags={form.specialities}
                            onChange={(specialities) =>
                                handleFieldChange(
                                    "specialities",
                                    specialities
                                )
                            }
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-neutral-50 dark:bg-neutral-950/40 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={updateProfile.isPending}
                    >
                        {updateProfile.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}