import { useState } from "react";
import { useLogout } from "@/queries/auth.query";
import { useRouter } from "next/navigation";

import Avatar from "@/components/ui/Avatar";
import PortalDropdown from "@/components/ui/PortalDropdown";

import {
    EllipsisVertical,
    Pencil,
    LogOut,
} from "lucide-react";

import TouristMetaRow from "./TouristMetaRow";
import TouristLanguagesRow from "./TouristLanguagesRow";
import TouristInterestsRow from "./TouristInterestsRow";
import TouristWishlistBadge from "./TouristWishlistBadge";

export default function TouristDashboardHeader({ tourist }) {
    const router = useRouter();
    const logout = useLogout();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setMenuOpen(false);

        logout.mutate(undefined, {
            onSettled: () => router.push("/"),
        });
    };

    return (
        <header className="relative flex flex-col md:flex-row items-center justify-center gap-14 w-full">

            <Avatar
                src={tourist?.profilePicture?.src}
                size="lg"
            />

            <section className="flex flex-col gap-1">

		        <h1 className="text-3xl text-primary font-bold font-mono">
		            {tourist?.name}
		        </h1>

                <TouristMetaRow tourist={tourist} />

                <TouristLanguagesRow tourist={tourist} />

                <TouristInterestsRow tourist={tourist} />

                <TouristWishlistBadge tourist={tourist} />

            </section>

            <PortalDropdown
                open={menuOpen}
                onOpenChange={setMenuOpen}
                button={
                    <button className="cursor-pointer rounded-full p-2 hover:bg-secondary/10 transition-colors">
                        <EllipsisVertical
                            size={20}
                            className="text-neutral-500"
                        />
                    </button>
                }
            >
                <div className="w-48 dark:bg-secondary/5 border border-secondary/75 rounded-xl shadow-lg p-1.5 overflow-hidden">

                    <button
                        className="w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        onClick={() => {
                            setMenuOpen(false);
                            router.push("/dashboard/edit");
                        }}
                    >
                        <Pencil
                            size={15}
                            className="text-neutral-400"
                        />

                        Edit Profile
                    </button>

                    <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />

                    <button
                        disabled={logout.isPending}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={15} />

                        {logout.isPending
                            ? "Logging out..."
                            : "Logout"}
                    </button>

                </div>

            </PortalDropdown>

        </header>
    );
}