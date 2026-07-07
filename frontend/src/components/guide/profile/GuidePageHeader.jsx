import { useRouter } from "next/navigation";
import useChatStore from "@/store/chat/chat.store.js";
import { useGetOrCreateDirectChat } from "@/queries/chat.query.js";
import { useGetMe } from "@/queries/auth.query.js";
import { showToast } from "@/store/ui.store";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Mountain } from "lucide-react";

import GuideNameBadges from "./GuideNameBadges";
import GuideMetaRow from "./GuideMetaRow";
import GuideStatsRow from "./GuideStatsRow";
import GuideAvailabilityBadge from "./GuideAvailabilityBadge";
import GuideTagSection from "./GuideTagSection";

export default function GuidePageHeader({ guide }) {
    const openDirectChat = useChatStore(store => store.openDirectChat);
    const { data: me, isLoading } = useGetMe();
    const router = useRouter();

    const handleChatWithGuide = () => {
        if (!me) {
            showToast({
                title: "Cannot perform this action",
                message: "Please login to use this feature"
            });

            return;
        }
        openDirectChat(guide, () => {
            router.push('/chat');
        });
    };

    return (
        <header className="flex flex-col md:flex-row items-center gap-8 md:px-24">
            <Avatar src={guide?.profilePicture?.src} size={"lg"} />

            <section className="flex flex-col gap-4 flex-1">

                <section className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                        <GuideNameBadges guide={guide} />

                        <Button
                            variant={"primary"}
                            color={"green"}
                            size="md"
                            className={"w-fit shrink-0"}
                            onClick={handleChatWithGuide}
                        >
                            Chat with Guide
                        </Button>
                    </div>

                    <GuideMetaRow guide={guide} />
                    <GuideStatsRow guide={guide} />
                    <GuideAvailabilityBadge guide={guide} />
                </section>

                <p className="text-sm text-text/85">
                    {guide?.aboutMe || "User has not set a description"}
                </p>

                <div className="flex flex-wrap gap-6">
                    <GuideTagSection title="Regions" items={guide?.regions} variant="blue" icon={Mountain} />
                    <GuideTagSection title="Languages" items={guide?.languages} variant="default" capitalize />
                    <GuideTagSection title="Specialities" items={guide?.specialities} variant="green" capitalize />

                </div>

            </section>
        </header>
    );
}