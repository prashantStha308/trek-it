"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useGetMe, useLogin } from "@/queries/auth.query";
import { showToast } from "@/store/ui.store";

import { Button } from "@/components/ui/Button";
import TextInput from "@/components/input/TextInput";
import { Eye, Mail } from "lucide-react";



const Header = () => {
    
    return (
        <header
            className="flex flex-col items-center gap-6"
        >
            <div
                className="h-16 w-16 rounded-full "
            >
                <Image src={"/assets/svg/ico_1.svg"} alt="logo" width={100} height={100} />
            </div>

            <div
            className="flex flex-col items-center gap-2"
            >
                <h1 className="text-primary font-bold text-4xl text-center" > Welcome Back </h1>
                <span className="text-center text-xs" >
                    New to Trek-It?&nbsp;
                    <Link href={"/register"}
                        className="text-xs text-blue-500 hover:underline "
                    >
                        Sign Up here
                    </Link>
                </span>
            </div>
        </header>
    )
}

export default function Login() {
    const [isPasswordReveled, setPasswordReveal] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const login = useLogin();
    const { data: me } = useGetMe();

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const toggglePasswordVisibility = () => {
        setPasswordReveal(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login.mutateAsync(formData);
        console.log("logged in")

        router.push("/");
    }

    return (
        <section
            id="login-page"
            className="flex flex-1 justify-between items-center relative overflow-hidden h-full"
        >
            <section
                id="login-image"
                className="relative isolate h-full object-cover hidden lg:block "
            >
                <Image
                    src={"/assets/img/login-img.jpg"} alt="" width={400} height={400}
                    id="login-img"
                    className="rounded-l-lg rounded-r-xs h-full z-10 object-cover "
                />
            </section>

            <div
                className="hidden dark:block absolute h-full w-sm dark:bg-teal-500/15 blur-3xl -z-10 left-20  "
            >

            </div>

            <form
                id="login-form"
                className="flex flex-1 px-10 flex-col gap-10"
                onSubmit={handleSubmit}
            >
                <Header />

                <section
                    id="login-form-body"
                    className="flex flex-col gap-6"
                >
                    <TextInput
                        type={"email"}
                        label={"Email"}
                        name={"email"}
                        id={"email"}
                        value={formData.email}
                        handleChange={handleChange}
                        placeholder={"Enter your email..."}
                        leftIcon={<Mail />}
                    />

                    <TextInput
                        type={isPasswordReveled ? "text" : "password" }
                        label={"Password"}
                        name={"password"}
                        id={"password"}
                        value={formData.password}
                        handleChange={handleChange}
                        placeholder={"Enter your password..."}
                        leftIcon={<Eye />}
                        callback={toggglePasswordVisibility}
                    />

                    <Button type={"submit"} variant="form" color="green" > Login </Button>

                </section>

                <div
                    className="h-16"
                ></div>

            </form>
        </section>
    )
}