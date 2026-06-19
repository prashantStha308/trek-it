"use client"

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
    useCreateBooking
} from "@/queries/booking.query";

import {
    useGetPackageById
} from "@/queries/package.query";

import { optimizeImageUrl } from "@/utils/utils.helper";

import TextInput from "@/components/input/TextInput";
import {Button} from "@/components/ui/Button";



export default function BookingPage(){

    const { packageId } = useParams();
    const router = useRouter();

    const { data: pkg, isLoading } = useGetPackageById(packageId);

    const createBooking = useCreateBooking();

    const [ formData, setFormData ] = useState({
        date: "",
        groupSize: 1,
    });

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

	const handleSubmit = (e) => {
	    e.preventDefault();

	    createBooking.mutate(
	        {
	            packageId,
	            date: formData.date,
	            groupSize: Number(formData.groupSize)
	        },
	        {
	            onSuccess: () => {
	                router.back();
	            }
	        }
	    );
	};

    if(isLoading){
        return(
            <section className="p-8 text-text/60">
                Loading...
            </section>
        )
    }

    return(
        <section
            className="px-4 lg:px-52 py-8 flex flex-col gap-8"
        >

            <section
                className="flex flex-col lg:flex-row gap-8"
            >

                <div className="w-full lg:w-1/2">
                    <Image
                        src={optimizeImageUrl(pkg?.thumbnail, 1080)}
                        alt={pkg?.name}
                        width={600}
                        height={400}
                        className="w-full rounded-lg object-cover"
                    />
                </div>

                <section
                    className="flex flex-col gap-4 flex-1"
                >

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-primary">
                            {pkg?.name}
                        </h1>

                        <p className="text-text/70">
                            {pkg?.description}
                        </p>
                    </div>

                    <section
                        className="flex flex-col gap-2 text-text"
                    >
                        <div className="flex gap-2">
                            <span className="font-medium">
                                Duration:
                            </span>

                            <span>
                                {pkg?.daysAlloted} days
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-medium">
                                Price per person:
                            </span>

                            <span>
                                $.{pkg?.pricePerPerson}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-medium">
                                Max group size:
                            </span>

                            <span>
                                {pkg?.maxGroupSize} person
                            </span>
                        </div>
                    </section>

                </section>

            </section>

            <section
                className="bg-white dark:bg-secondary/15 border border-border rounded-lg p-4 flex flex-col gap-4"
            >

                <header className="text-center">
                    <h1 className="text-2xl font-bold text-primary">
                        Create Booking
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Choose your trip details
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

				<div
				    className="flex flex-col gap-1 w-full"
				>
				    <label
				        htmlFor="date"
				        className="text-xs text-text/75 pl-1"
				    >
				        Starting Date
				    </label>

				<div
				    onClick={() => document.getElementById("date").showPicker?.()}
				    className="flex items-center gap-4 text-sm justify-between border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-3 cursor-pointer"
				>
				    <input
				        type="date"
				        name="date"
				        id="date"
				        value={formData.date}
				        onChange={handleChange}
				        min={new Date().toISOString().split("T")[0]}
				        className="outline-none flex-1 bg-transparent pointer-events-none"
				        required
				    />
				</div>
				</div>

                    <TextInput
                        type="number"
                        name="groupSize"
                        id="groupSize"
                        label="Group Size"
                        value={formData.groupSize}
                        handleChange={handleChange}
                        min={1}
                        max={pkg?.maxGroupSize}
                    />

                    <section
                        className="flex flex-col gap-4 items-center justify-between mt-2 w-full"
                    >

                        <div
                            className="flex justify-between w-full "
                        >
                            <span className="text-sm text-text/60">
                                Total Price
                            </span>

                            <span className="text-xl font-bold text-primary">
                                $.{pkg?.pricePerPerson * formData.groupSize}
                            </span>
                        </div>

                        <Button
                        	variants={"form"}
                            type="submit"
                            size="lg"
                            disabled={createBooking.isPending}
                        >
                            {
                                createBooking.isPending
                                ? "Creating..."
                                : "Confirm Booking"
                            }
                        </Button>

                    </section>

                </form>

            </section>

        </section>
    )
}