"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/queries/auth.query";
import { useUpdateMe } from "@/queries/user.query";

import ImageUploader from "@/components/package/ImageUploader";
import TextInput from "@/components/input/TextInput";
import TagInput from "@/components/input/TagInput";

import { Button } from "@/components/ui/Button";
import LoadingSection from "@/components/loaders/LoadingSection";

import { showToast } from "@/store/ui.store";

export default function TouristEditPage() {
    const router = useRouter();

    const { data: tourist, isLoading } = useGetMe();
    const updateProfile = useUpdateMe();

    const [form, setForm] = useState(null);
    const [changingPhoto, setChangingPhoto] = useState(false);

    useEffect(() => {
        if (!tourist) return;

        setForm({
            name: tourist.name ?? "",
            profilePicture: tourist.profilePicture ?? null,
            preferredLanguages: tourist.preferredLanguages ?? [],
            interests: tourist.interests ?? [],
        });
    }, [tourist]);

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
                id: tourist._id,
                ...form,
            },
            {
                onSuccess: (res) => {
                    router.push("/dashboard");
                    showToast({
                        title: "Success",
                        message: res.message ?? "Profile updated successfully",
                    });
                },
                onError: (err) => {
                    showToast({
                        title: "Failed",
                        message: err.message ?? "Failed to update profile",
                    });
                },
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
                    <h1 className="text-xl font-semibold">Edit Profile</h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Keep your profile updated so guides can better understand your preferences.
                    </p>
                </div>

                {/* Profile Picture */}
                <div className="px-8 py-6 flex flex-col gap-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-5">
                        {form.profilePicture?.src && !changingPhoto && (
                            <img
                                src={form.profilePicture.src}
                                alt="Current profile photo"
                                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium">Profile Photo</p>
                            <p className="text-xs text-neutral-500">
                                Use a clear photo so guides can easily recognize you.
                            </p>
                        </div>
                    </div>

                    {!changingPhoto ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-fit"
                            onClick={() => setChangingPhoto(true)}
                        >
                            Change Photo
                        </Button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <ImageUploader
                                maxImage={1}
                                onChange={({ thumbnail }) =>
                                    handleFieldChange("profilePicture", thumbnail)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-fit"
                                onClick={() => {
                                    setChangingPhoto(false);
                                    handleFieldChange("profilePicture", tourist.profilePicture ?? null);
                                }}
                            >
                                Keep Current Photo
                            </Button>
                        </div>
                    )}
                </div>

                {/* Basic Information */}
                <div className="px-8 py-6 flex flex-col gap-5 border-b border-neutral-100 dark:border-neutral-800">
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        value={form.name}
                        handleChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                </div>

                {/* Languages */}
                <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Preferred Languages
                        </label>
                        <p className="text-xs text-neutral-500 mb-2">
                            Guides will know which languages you prefer to communicate in.
                        </p>
                        <TagInput
                            tags={form.preferredLanguages}
                            onChange={(langs) => handleFieldChange("preferredLanguages", langs)}
                        />
                    </div>
                </div>

                {/* Interests */}
                <div className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Interests
                        </label>
                        <p className="text-xs text-neutral-500 mb-2">
                            Add activities or destinations you're interested in, such as trekking, camping, wildlife, or photography.
                        </p>
                        <TagInput
                            tags={form.interests}
                            onChange={(interests) => handleFieldChange("interests", interests)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-neutral-50 dark:bg-neutral-950/40 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={updateProfile.isPending}>
                        {updateProfile.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}