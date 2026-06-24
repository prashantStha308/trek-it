import Link from "next/link";

import {
	Bell,MessageCircle, CirclePlus,

	House, Search, 
} from "lucide-react"
import TrekItLogo from "@/components/ui/TrekItLogo";
import Avatar from "@/components/ui/Avatar";

import { useGetMe } from "@/queries/auth.query";
import {toggleNotification} from "@/store/notification/notification.store.js";


export const NavbarMobileTop = () => {
	return(
		<header
			className="flex justify-between items-center border-b border-b-secondary bg-secondary/35 dark:bg-secondary/25 backdrop-blur-3xl py-1 px-4 z-30"
		>
			<TrekItLogo withText={false} />

				<div className="text-sm text-text font-medium" >
					<span className="text-primary" >Trek</span>-It
				</div>

			<button
				type="button"
				onClick={toggleNotification}
				className="text-text hover:bg-secondary p-2 rounded-md cursor-pointer "
			>
				<Bell size={20} />
			</button>

		</header>
	)
}


export const NavbarMobileBottom = () => {

	const { data:me, isLoading } = useGetMe();

	const links = [
		{ href: "/", icon: <House size={25} strokeWidth={1.5} /> },
		{ href: "/explore", icon: <Search size={25} strokeWidth={1.5} /> },

		...(me?.role === "guide"
			? [{ href: "/explore/packages/create", icon: <CirclePlus size={25} strokeWidth={1.5} /> }]
			: []),

		{ href: "/chat", icon: <MessageCircle size={25} strokeWidth={1.5} /> },
		{ href: "/dashboard", icon: <Avatar size="xs" src={me?.profilePicture?.src} /> },
	];


	return(
		<aside
			className="flex justify-between items-center border-t border-t-secondary bg-secondary/55 dark:bg-secondary/35 backdrop-blur-3xl py-2 px-4 z-30"
		>
			{
				links.map((lnk, index) => (
					<Link key={index} href={lnk.href} className="text-text cursor-pointer px-2 py-1 hover:bg-secondary rounded-lg" >
						{lnk.icon}
					</Link>
				))
			}
		</aside>
	)
}