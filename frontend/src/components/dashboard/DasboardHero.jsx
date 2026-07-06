import { useLogout } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import Avatar from "../ui/Avatar";
import { Button } from "../ui/Button";

import{ Dot } from "lucide-react";

export default function DashboardHero({ user }) {
	const logout = useLogout();
	const router = useRouter();

	const handleLogout = () => {
		logout.mutate( undefined,{
			onSettled: () => router.push("/")
		} );
	};

	return (
		<header className=" relative flex flex-col md:flex-row items-center justify-center gap-14  ">
			<Avatar src={user?.profilePicture?.src} size={"lg"} />

			<section className="flex flex-col items-center md:items-start gap-4">

				<section className="flex flex-col gap-0.5">
					<h1 className="text-3xl text-primary font-bold font-mono">
						{" "}
						{user?.name}{" "}
					</h1>

					<div className="flex gap-1 capitalize text-sm text-text/60" >
						<span>
							{" "}
							{user?.role}{" "}
						</span>

						<Dot />

						<span>
							{user?.gender}
						</span>
					</div>
				</section>

				<textarea
					className="text-sm text-text/85 resize-none w-sm outline-none caret-transparent"
					value={user?.description || "User has not set a description"}
					readOnly
				></textarea>
			</section>

			<Button variant={"primary"} color={"red"} size={"md"} className={"absolute top-2  right-5 lg:right-64 w-fit"} onClick={handleLogout}>
				Logout
			</Button>
		</header>
	);
}
