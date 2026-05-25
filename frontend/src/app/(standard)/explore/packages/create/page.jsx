"use client"
import {useState} from "react"

import {useCreatePackage} from "@/queries/package.query.js"
import TextInput from "@/components/input/TextInput";
import TagInput from "@/components/input/TagInput"


export default function CreatePackagePage(){
	const createPackage = useCreatePackage();

	const [ formData, setFormData ] = useState({
		name: "",
		description: "",
		keywords: [],
		regions: [],
		activities: [],
		startingPrice: 0,
		pricePerPerson: 0,
		maxGroupSize: 0,
		daysAlloted: 0,
		requiresPermit: undefined,
		images: [],
		thumbnail: undefined,
		stops: []
	});


	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Submitting")
	}

    const handleChange = ({ target: { name, value } }) => {

        console.log("HandleChange at package creation: ", {name, value})

        if (name.includes(".")) {
            // handle nested object
            console.log("triggered object include");
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                    ...prev,
                    [parent]: { ...prev[parent], [child]: value }
                }));

        } else {
            console.log("triggered normal include");
            // Normal values
            setFormData(prev => ({ ...prev, [name]: value }));

        }
    };

	const set = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }))

	return(
		<section
			className="bg-white dark:bg-secondary/15 border border-border rounded-lg p-4 flex flex-col gap-4"
		>
			<header className="text-center" >
		        <h1 className="text-2xl font-bold text-primary">Create New Package</h1>
		        <p className="text-sm text-muted-foreground mt-1">Fill in the details to list a new trekking package</p>
			</header>

			<form
				className="flex flex-col gap-4"
			>
				<TextInput
					type="text"
					placeholder="Enter the name of your package"
					name="name" id="name" label="Package Name"
					value={formData.name}
					handleChange = {handleChange}
				/>

		        <div
		            className="flex flex-col gap-1 w-full"
		        >
	                <label
	                    htmlFor="email"
	                    className="text-xs text-text/75 pl-1"
	                >
	                    Description:
	                </label>
		            
		            <div
		                className="flex items-center gap-4 text-sm justify-between border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-1 overflow-y-hidden group"
		            >

		                <textarea
		                    name="description" id="description"
		                    className="outline-none flex-1 appearance-none bg-transparent resize-none"
		                    placeholder={"Describe your package"}
		                    value={formData.description}
		                    onChange = {handleChange}
		                    rows={4}
		                />
		            </div>
		        </div>

		        <div>
		        	<label htmlFor="keywords">Keywords (press Enter to add)</label>
		        	<TagInput tags={formData.keywords} onChange={(v) => set("keywords", v)} placeholder="adventure, scenic..." />
		        </div>

			</form>
			
		</section>
	)
}