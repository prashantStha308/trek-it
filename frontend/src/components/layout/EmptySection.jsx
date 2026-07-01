import { Wind } from "lucide-react";

export default function EmptySection(){

	return(
		<section className="h-full w-full flex flex-col items-center text-primary " >
			
			<Wind size={70} strokeWidth={1} />

			<h1 className="text-2xl font-semibold" >
				It{"'"}s empty here
			</h1>

		</section>
	)
}