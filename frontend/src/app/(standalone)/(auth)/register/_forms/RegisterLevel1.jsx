"use client"

import { Button } from "@/components/ui/Button";
import { SelectInput, TextInput } from "@/components/ui/Input";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import { FolderPen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



const isValidString = (str) => str && str.trim() !== "";
const validatePassword = (password) =>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    return passwordRegex.test(password);
}

export default function RegisterLevel1({handleNext, handleChange, formData}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleVisibility = () => setIsPasswordVisible(state => !state);

    const handleSubmitPage = () => {
        const errors = [];

        if (!isValidString(formData.name)) errors.push("Name is required");
        if (!isValidString(formData.email)) errors.push("Email is required");
        if (!validatePassword(formData.password)) errors.push("Invalid Password. Password requires atleast 8 characters, an upper case and lower case letter with atleast one number and special character");
        if (formData.age <= 0) errors.push("Please enter a valid age");
        if (!isValidString(formData.gender)) errors.push("Gender is required");

        if (errors.length > 0) {
            // showModal(errors); // uncomment when modal ready
            return;
        }

        handleNext();
    };

    return (
        <section className="flex flex-1 justify-between px-6  flex-col gap-5 ">

            <section
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-text font-bold text-base xl:text-3xl text-center" >
                    Join in for <span className="text-primary" >Adventure</span>
                </h1>
                <span className="text-center text-xs" >
                    Already have an account?&nbsp;
                    <Link href={"/login"}
                        className="text-blue-500 hover:underline "
                    >
                        Sign In here
                    </Link>
                </span>
            </section>

            <section
                className="flex flex-col gap-6"
            >
                <TextInput
                    type={"text"}
                    label={"Full Name"}
                    name={"name"}
                    id={"name"}
                    placeholder={"Enter your name..."}
                    sideItem={<FolderPen size={16} />}
                    handleChange={handleChange}
                    value={formData.name}
                    required={true}
                />

                <TextInput
                    type={"email"}
                    label={"Email"}
                    name={"email"}
                    id={"email"}
                    placeholder={"Enter your email..."}
                    sideItem={<Mail size={16} />}
                    handleChange={handleChange}
                    value={formData.email}
                    required={true}
                />

                <TextInput
                    type={isPasswordVisible ? "text" : "password" }
                    label={"Password"}
                    name={"password"}
                    id={"password"}
                    placeholder={"Enter your password..."}
                    sideItem={<Eye size={16} />}
                    handleChange={handleChange}
                    value={formData.password}
                    required={true}
                    callback={toggleVisibility}
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full">

                    <TextInput
                        type={"number"}
                        label={"Age"}
                        name={"age"}
                        id={"age"}
                        placeholder={"Enter your age..."}
                        sideItem={<Eye size={16} />}
                        handleChange={handleChange}
                        value={formData.age}
                        required={true}
                    />

                    <SelectInput
                        id={"gender"}
                        name={"gender"}
                        label={"Gender"}
                        optionObjArray={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Others", value: "others" },
                        ]}
                        handleChange={handleChange}
                        value={formData.gender}
                        required={true}
                    />

                </div>
            </section>

            <Button type={"button"} text="Next" variant="form" handleClick={handleSubmitPage} />

        </section>
    )
}