"use client";

import { useParams } from 'next/navigation';
import {
	HeartHandshake, Check, Dot,
	MapPin,
	Venus, Mars,
	Cake,
} from "lucide-react"
import Badge from "@/components/ui/Badge"
import Avatar from "@/components/ui/Avatar";

import {useGetGuideById} from "@/queries/guide.query";


export default function GuidePage(){

	const {guideId} = useParams();
	const { data:guide, isLoading, isError, error } = useGetGuideById(guideId)


	if(isLoading){
		return "Loading..."
	}

	return (
		<section
			className="flex flex-col gap-4"
		>
			<header
				className="flex flex-col lg:flex-row justify-around px-20 gap-20 "
			>
				<div className="relative w-32 aspect-square " >
					<Avatar src={guide?.profilePicture?.src} alt={guide?.name} size={"lg"} />

					<div className={`${ guide.isAvailable ? "bg-primary" : "bg-red-500" } border-4 border-background w-8 h-8 absolute bottom-12 right-2 rounded-full`} />
				</div>

				<section className="flex flex-col flex-1 py-5 " >
					<article className="flex flex-col gap-2" >

						<section id="guide-badges" className="flex items-center gap-4" >
							<h1 className="text-xl lg:text-3xl text-text font-semibold" > {guide?.name} </h1>
		                    {
		                        guide.isVerified && (
		                                <Badge variant="green"  size={"lg"} >
		                                    <Check size={13} />
		                                    <span>Verified</span>
		                                </Badge> 
		                        )
		                    }

			                {
			                    guide.isTrusted && (
			                        <Badge variant="blue"  size={"lg"} >
			                            <div className="flex gap-1 items-center " >
			                                <HeartHandshake size={14} />
			                                <span> Trusted </span>
			                            </div>
			                        </Badge> 
			                    )
			                }
						</section>

						<section id="guide-meta" className="flex gap-1 text-text/65 text-xs " >
							<div className="flex items-center capitalize gap-2" >
								<MapPin size={15} /> {guide?.address.city && guide.address.state + ","} {guide?.address.country}
							</div>

							<Dot size={20} />

							<div className="flex items-center capitalize gap-2" >
								 {guide.gender === "male" ? <Mars size={16} /> : <Venus size={16} /> } {guide?.gender}
							</div>

							<Dot size={20} />

							<div className="flex items-center capitalize gap-2" >
								<Cake  size={16}/> {guide?.age} Yrs
							</div>
						</section>

						<section id="guide-lang-region-badges"  className="w-full flex flex-wrap gap-1 text-text/65 text-xs "  >
							{
								guide?.languages.map((lang, index) => (
									<Badge key={lang} size={"sm"} variant="green" > {lang} </Badge>
								))
							}
							{
								guide?.regions.map((region, index) => (
									<Badge key={region} size={"sm"} variant="blue" > {region} </Badge>
								))
							}
						</section>

						<section id="guide-package-meta" className="flex gap-8 text-xs text-text"  >
							
							<article className="flex flex-col items-center gap-1 bg-secondary/55 px-4 py-1 rounded-md" >
								<span className="text-[10px] text-text/65" > RATINGS </span>
								<span className="font-semibold" > {guide?.rating}/5 </span>
							</article>

							{/*TODO: Build the getStat controller, and uncomment this*/}
{/*							<article className="flex flex-col items-center gap-1 bg-secondary/55 px-4 py-1 rounded-md" >
								<span className="text-[10px] text-text/65" > PACKAGES </span>
								<span className="font-semibold" > {guidePackages.packages.length} </span> 
							</article>
*/}
							<article className="flex flex-col items-center gap-1 bg-secondary/55 px-4 py-1 rounded-md" >
								<span className="text-[10px] text-text/65" > TREKS </span>
								{/*update this later*/}
								<span className="font-semibold" > {guide?.trekCount} </span> 
							</article>

						</section>

					</article>
				</section>

			</header>

		</section>
	)
}