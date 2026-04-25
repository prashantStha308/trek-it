"use client"

import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Login() {
    const [isPasswordReveled, setPasswordReveal] = useState(false);

    const toggglePasswordVisibility = () => {
        setPasswordReveal(prev => !prev);
    }

    return (
        <section
            id="login-page"
            className="flex flex-1 justify-between items-center relative overflow-hidden"
        >
            <section
                id="login-image"
                className="relative isolate"
            >
                <Image
                    src={"/assets/img/login-img.jpg"} alt="" width={400} height={400}
                    id="login-img"
                    className="rounded-l-lg rounded-r-xs h-full z-10 "
                />
            </section>

            <div
                className="hidden dark:block absolute h-full w-sm dark:bg-teal-500/15 blur-3xl -z-10 left-20  "
            >

            </div>

            <form
                id="login-form"
                className="flex flex-1 px-40 flex-col gap-10 "
            >
                <header
                    className="flex flex-col items-center gap-6"
                >
                    <div
                        className="h-20 w-20 bg-secondary rounded-full "
                    ></div>

                    <div
                    className="flex flex-col items-center gap-2"
                    >
                        <h1 className="text-text font-bold text-4xl text-center" > Welcome Back </h1>
                        <span className="text-center text-sm" >
                            New to Trek-It?&nbsp;
                            <Link href={"/register"}
                                className="text-sm text-blue-500 hover:underline "
                            >
                                Sign Up here
                            </Link>
                        </span>
                    </div>
                </header>

                <section
                    id="login-form-body"
                    className="flex flex-col gap-6"
                >
                    <TextInput
                        type={"email"}
                        label={"Email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Enter your email..."}
                        sideItem={<Mail />}
                    />

                    <TextInput
                        type={isPasswordReveled ? "text" : "password" }
                        label={"Password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Enter your password..."}
                        sideItem={<Eye />}
                        callback={toggglePasswordVisibility}
                    />

                    <Button type={"submit"} text="Login" variant="form" />

                </section>

                <div
                    className="h-16"
                ></div>

            </form>
        </section>
    )
}