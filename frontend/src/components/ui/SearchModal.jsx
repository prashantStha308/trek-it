import {useEffect} from "react";

import ModalWrapper from "@/components/layout/ModalWrapper";

import {useGlobalSearch} from "@/hooks/useGlobalSearch.jsx";
import useUIStore from "@/store/ui.store.js";

import { MapPinOff, ScrollText, X } from "lucide-react"
import DataSection from "@/components/explore/DataSection";


const HasDataSection = ({
	isLoading,
	guides,
	packages
})=> {
	return(
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
	)
}

const NoDataFound = ({searchWord})=>{
	return(
		<section
			className="h-full w-full flex flex-col gap-6 justify-center items-center text-primary"
		>
			<MapPinOff size={70} strokeWidth={1}/>

			<h1 className="text-2xl font-semibold" >
				No result matching {`"${searchWord}"`}
			</h1>
		</section>
	)
}

const EmptySearchWord = ()=>{
	return(
		<section
			className="h-full w-full flex flex-col gap-6 justify-center items-center text-primary"
		>
			<ScrollText size={110} strokeWidth={1} />
			<h1 className="text-2xl font-semibold" >
				Type atleast 2 letters to search
			</h1>
		</section>
	)
}

export default function SearchModal() {
    const { searchWord, hasMinLength, packages, guides, isLoading, setIsSearchModalOpen } = useGlobalSearch();


    const hasData = (packages.length + guides.length) > 0

	useEffect(()=>{
		document.body.style.setProperty("overflow", "hidden");
		return ()=> document.body.style.setProperty("overflow", "auto");
	})


    return (
        <ModalWrapper>

        	<div
        		className=" relative scrollbar-none w-full h-full rounded-lg bg-background border border-border/75 overflow-y-auto"
        	>
	        	<div
	        		className="absolute top-3 right-5 text-text/75 border border-secondary hover:bg-accent/25 rounded-full cursor-pointer" 
	        		onClick={()=>setIsSearchModalOpen(false)}
	        	>
	        		<X size={20} />
	        	</div>


	        	{
	        		searchWord.length < 2 ? (
	        			<EmptySearchWord />
	        		) : (
		        		hasData ? (
		        			<HasDataSection
		        				isLoading={isLoading}
		        				guides={guides}	
		        				packages={packages}	
	        				/>
		        		) :(
		        			<NoDataFound
		        				searchWord={searchWord}
		        			/>
		        		)
	        		)
	        	}
        	</div>
        </ModalWrapper>
    );
}