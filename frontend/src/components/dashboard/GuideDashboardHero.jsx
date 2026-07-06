import { useState } from "react";
import { useLogout } from "@/queries/auth.query";
import { useRouter } from "next/navigation";

import Avatar from "@/components/ui/Avatar";
import PortalDropdown from "@/components/ui/PortalDropdown";
import { EllipsisVertical, Pencil, LogOut } from "lucide-react";

import GuideNameBadges from "@/components/guide/profile/GuideNameBadges";
import GuideMetaRow from "@/components/guide/profile/GuideMetaRow";
import GuideStatsRow from "@/components/guide/profile/GuideStatsRow";
import GuideAvailabilityBadge from "@/components/guide/profile/GuideAvailabilityBadge";

export default function GuideDashboardHero({ guide }) {
    const logout = useLogout();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setMenuOpen(false);
        logout.mutate(undefined, {
            onSettled: () => router.push("/"),
        });
    };

    return (
        <header className="relative flex flex-col md:flex-row items-center justify-center gap-14 w-full">
            <Avatar src={guide?.profilePicture?.src} size={"lg"} />

            <section className="flex flex-col gap-1">
                <GuideNameBadges guide={guide} />
                <GuideMetaRow guide={guide} />
                <GuideStatsRow guide={guide} />
                <GuideAvailabilityBadge guide={guide} />

                <section>
                	<p>
                		{guide?.aboutMe}
                	</p>
                </section>

            </section>

			<PortalDropdown
			    open={menuOpen}
			    onOpenChange={setMenuOpen}
			    button={
			        <button
			            className="cursor-pointer rounded-full p-2 hover:bg-secondary/10 transition-colors"
			        >
			            <EllipsisVertical size={20} className="text-neutral-500" />
			        </button>
			    }
			>
			    <div className="w-48 dark:bg-secondary/5 border border-secondary/75 rounded-xl shadow-lg p-1.5 overflow-hidden">

					<button
					    type="button"
					    onClick={() => {
					        setMenuOpen(false);
					        router.push("/dashboard/guide/edit");
					    }}
					    className="w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
					>
					    <Pencil size={15} className="text-neutral-400" />
					    Edit Profile
					</button>

			        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />

			        <button
			            type="button"
			            disabled={logout.isPending}
			            onClick={handleLogout}
			            className="w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			        >
			            <LogOut size={15} />
			            {logout.isPending ? "Logging out…" : "Logout"}
			        </button>
			    </div>
			</PortalDropdown>

        </header>
    );
}