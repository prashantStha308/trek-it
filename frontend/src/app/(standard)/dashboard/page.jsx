"use client"

import {useRouter} from "next/navigation";
import {
	useGetMe,
	useLogout
} from "@/queries/auth.query";
import {
	useGetUserBookings,
	useGetActiveBookings,
} from "@/queries/booking.query";
import AuthGuard from "@/components/shared/AuthGuard";

import Avatar from "@/components/ui/Avatar";
import UserBookings from "@/components/booking/UserBookings";
import {Button} from "@/components/ui/Button";

function DashboardHero({user}){

	const logout = useLogout();
	const router = useRouter();

	const handleLogout = () => {
		logout.mutate();
		router.push("/")
	}

	return(
		<header
			className="flex items-start gap-14 px-52 "
		>
			<Avatar src={user?.profilePicture?.src} size={"lg"} />

			<section className="flex flex-col gap-4" >
				<section className="flex flex-col gap-0.5" >
					<h1 className="text-3xl text-primary font-bold font-mono" > {user?.name} </h1>
					<span className="capitalize text-sm text-text/60" > {user?.role} </span>
					{/*<span className="capitalize text-sm text-text/60" > {user?.email} </span>*/}
				</section>
				
				<textarea
					className="text-sm text-text/85 resize-none w-sm outline-none caret-transparent"
					value={user?.description || "User has not set a description"}
					readOnly
				></textarea>

			</section>
			<Button
				variant={"critical"}
				className={"w-fit"}
				onClick = {handleLogout}
			>
				Logout
			</Button>


		</header>
	)
}

export default function DashboardPage(){
    const {data, isLoading, isError, error} = useGetMe();


	return(
		<AuthGuard>
			<section
				className="px-20 flex flex-col gap-20 "
			>
				<DashboardHero user={data} />

				<UserBookings user={data} />

			</section>
		</AuthGuard>
	)
}