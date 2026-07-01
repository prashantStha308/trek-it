import {useEffect} from "react";

import ModalWrapper from "@/components/layout/ModalWrapper";

import {useGlobalSearch} from "@/hooks/useGlobalSearch.jsx";
import useUIStore from "@/store/ui.store.js";

import { MapPinOff } from "lucide-react"
import DataSection from "@/components/explore/DataSection";


export default function SearchModal() {
    const { searchWord, hasMinLength, packages, guides, isLoading } = useGlobalSearch();

    const hasData = (packages.length + guides.length) > 0

	useEffect(()=>{
		document.body.style.setProperty("overflow", "hidden");
		return ()=> document.body.style.setProperty("overflow", "auto");
	})

    return (
        <ModalWrapper>
        	<div
        		className=" scrollbar-none w-full h-full rounded-lg bg-background border border-border/75 overflow-y-auto"
        	>
	        	{
	        		hasData ? (
	        			<section
	        				className="flex flex-col py-4 gap-8"
	        			>
				            <DataSection
				            	label="Packages"
				            	data={packages}
				            	card="package"
				            	isLoading={isLoading}
				            />

				            <DataSection
				            	label="Guides"
				            	data={guides}
				            	card="guide"
				            	isLoading={isLoading}
				            />
	        			</section>
	        		) :(

	        			<section
	        				className="h-full w-full flex flex-col gap-6 justify-center items-center text-primary"
	        			>
	        				<MapPinOff size={70} strokeWidth={1}/>

	        				<h1 className="text-2xl font-semibold" >
	        					No result matching "{searchWord}"
	        				</h1>
	        			</section>
	        		)
	        	}
        	</div>
        </ModalWrapper>
    );
}