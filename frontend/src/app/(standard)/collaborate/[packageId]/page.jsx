"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetPackageById } from "@/queries/package.query.js";
import { useGetMe } from "@/queries/auth.query.js";
import { useSendCollabRequest } from "@/queries/collaboration.query.js";

import { Button } from "@/components/ui/Button";
import TextArea from "@/components/input/TextArea";
import MiniCard from "@/components/ui/MiniCard";
import { Handshake, PackageOpen, AlertCircle } from "lucide-react";

import {showToast} from "@/store/ui.store.js";


export default function CollaborationPage() {
    const { packageId } = useParams();
    const router = useRouter();

    const [requestDescription, setRequestDescription] = useState("");

    const { data: currentUser, isLoading: currentUserLoading } = useGetMe();
    const { data: targetPackage, isLoading: packageLoading } = useGetPackageById(packageId);
    const sendCollabRequest = useSendCollabRequest();

    const isOwnPackage = currentUser?._id === targetPackage?.guide?._id;
    const isAlreadyCollaborator = targetPackage?.collaborators?.some(
        (collaboratorId) => collaboratorId === currentUser?._id
    );

    const handleSendRequest = () => {
        if (!requestDescription.trim()) return;

        sendCollabRequest.mutate({
            packageId,
            description: requestDescription,
        },{
            onSuccess: () => {
                router.push(`/explore/package/${packageId}`);
            }
        }
        );
    };

    const handleDescriptionChange = (e) => {
        setRequestDescription(e.target.value);
    };

    if (packageLoading || currentUserLoading) {
        return (
            <section className="flex flex-col gap-6 px-6 py-10 max-w-2xl mx-auto">
                <div className="h-8 w-48 bg-secondary/20 rounded animate-pulse" />
                <div className="h-32 w-full bg-secondary/20 rounded animate-pulse" />
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-8 px-6 py-10 max-w-2xl mx-auto">

            {/* Page header */}
            <section className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <Handshake size={28} className="text-primary" />
                    <h1 className="text-text font-bold text-2xl">
                        Request Collaboration
                    </h1>
                </div>
                <p className="text-text/60 text-sm pl-1">
                    Send a collaboration request to join this package as a co-guide.
                </p>
            </section>

            {/* Package info */}
            <section className="flex flex-col gap-3 border border-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 text-text/60 text-xs uppercase tracking-wide">
                    <PackageOpen size={14} />
                    <span>Package</span>
                </div>
                <div className="flex items-center gap-4">
                    {targetPackage?.thumbnail?.src && (
                        <img
                            src={targetPackage.thumbnail.src}
                            alt={targetPackage?.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    )}
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-text font-semibold text-lg">
                            {targetPackage?.name}
                        </h2>
                        <span className="text-text/60 text-xs">
                            {targetPackage?.daysAlloted} days &middot; {targetPackage?.regions?.join(", ")}
                        </span>
                    </div>
                </div>

                {/* Package owner */}
                <div className="flex flex-col gap-1 pt-2 border-t border-secondary/50">
                    <span className="text-text/60 text-xs">Package owner</span>
                    <MiniCard
                        person={targetPackage?.guide}
                        subtitle={targetPackage?.guide?.role}
                        options={{ border: false, star: true }}
                    />
                </div>
            </section>

            {/* Guard: own package */}
            {isOwnPackage && (
                <section className="flex items-center gap-3 border border-red-400/40 bg-red-400/10 rounded-lg px-4 py-3">
                    <AlertCircle size={18} className="text-red-400 shrink-0" />
                    <p className="text-sm text-text/75">
                        You cannot request to collaborate on your own package.
                    </p>
                </section>
            )}

            {/* Guard: already collaborator */}
            {isAlreadyCollaborator && (
                <section className="flex items-center gap-3 border border-primary/40 bg-primary/10 rounded-lg px-4 py-3">
                    <AlertCircle size={18} className="text-primary shrink-0" />
                    <p className="text-sm text-text/75">
                        You are already a collaborator on this package.
                    </p>
                </section>
            )}

            {/* Request form */}
            {!isOwnPackage && !isAlreadyCollaborator && (
                <section className="flex flex-col gap-5">
                    <TextArea
                        label="Why do you want to collaborate on this package?"
                        name="requestDescription"
                        id="requestDescription"
                        placeholder="Describe your experience, why you're a good fit, what you bring to this package..."
                        value={requestDescription}
                        handleChange={handleDescriptionChange}
                        rows={4}
                    />

                    <div className="flex flex-col gap-1">
                        <Button
                            variant="primary"
                            color="green"
                            size="md"
                            onClick={handleSendRequest}
                            disabled={
                                !requestDescription.trim() ||
                                sendCollabRequest.isPending
                            }
                        >
                            {sendCollabRequest.isPending ? "Sending..." : "Send Collaboration Request"}
                        </Button>
                        {!requestDescription.trim() && (
                            <span className="text-xs text-text/50 text-center">
                                Please write a description before sending.
                            </span>
                        )}
                    </div>
                </section>
            )}
        </section>
    );
}