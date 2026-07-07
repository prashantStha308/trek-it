import { useGetGuidePackages } from "@/queries/package.query.js"
import { useGetMe } from "@/queries/auth.query.js"

import { Package } from "lucide-react";


import GuidePackagesSection from "@/components/guide/profile/GuidePackagesSection";


export default function DashboardGuidePackages(){
	const { data:me, isLoading:meLoading } = useGetMe();
	const { data:pkgs, isLoading:pkgLoading } = useGetGuidePackages(me?._id);

	const isLoading = meLoading || pkgLoading;

	return(
		<div className="flex flex-col gap-4 w-full" >

			<h1 className="text-xl text-primary font-semibold flex gap-3 items-center" >
				<Package />
				Your Packages
			</h1>

			<div className="w-full flex justify-center" >
				<GuidePackagesSection
					packages={pkgs?.docs || []}
					isLoading={isLoading}
					user={me}
				/>
			</div>

		</div>
	)

}