"use client"

import { Button } from "@/components/ui/Button";
import TextInput from "@/components/input/TextInput";
import SelectInput from "@/components/input/SelectInput";
import ListBox from "@/components/input/ListBox";

import { Eye, Calendar, Mail, FolderPen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {showToast} from "@/store/ui.store";



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
            showToast({
                title: "Errors in registration form",
                message: errors
            });
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
                    leftIcon={<FolderPen size={16} />}
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
                    leftIcon={<Mail size={16} />}
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
                    leftIcon={<Eye size={16} />}
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
                        leftIcon={ <Calendar size={16} />}
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
                        leftIcon={<Eye size={16} />}
                    />

                </div>
            </section>

            <Button type={"button"} variant="form" onClick={handleSubmitPage} > Next </Button>

        </section>
    )
}