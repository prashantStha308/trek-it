import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
    
    return (
        <section
            id="register-page"
            className="flex flex-1 justify-between relative overflow-hidden"
        >
            <div
                className="flex flex-1 flex-col h-full justify-between gap-20 py-2"
            >
                <header
                    className=" px-10 py-2 flex justify-between items-center w-full "
                >
                    <div></div>

                    <h2
                        className="text-lg font-semibold text-text/75"
                    >
                        Trek-It
                    </h2>
                    <div
                        className="h-8 w-8 bg-secondary rounded-full"
                    ></div>

                </header>

                <form
                    id="register-form"
                    className="flex flex-1 px-40 flex-col gap-10 "
                >

                    <section
                        className="flex flex-col items-center gap-6"
                    >

                        <div
                        className="flex flex-col items-center gap-2"
                        >
                            <h1 className="text-text font-bold text-3xl text-center" >
                                Add yourself in for Adventure
                            </h1>
                            <span className="text-center text-sm" >
                                Already have an account?&nbsp;
                                <Link href={"/login"}
                                    className="text-sm text-blue-500 hover:underline "
                                >
                                    Sign In here
                                </Link>
                            </span>
                        </div>
                    </section>

                    <section
                        id="regitser-form-body"
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
                            // type={isPasswordReveled ? "text" : "password" }
                            label={"Password"}
                            name={"password"}
                            id={"password"}
                            placeholder={"Enter your password..."}
                            sideItem={<Eye />}
                            // callback={toggglePasswordVisibility}
                        />

                        <Button type={"submit"} text="Register" variant="form" />

                    </section>

                </form>
            </div>

            <div
                className="hidden dark:block absolute h-full w-sm dark:bg-teal-500/15 blur-3xl -z-10 right-20  "
            ></div>
    
            <section
                id="register-image"
                className="relative isolate"
            >
                <Image src={"/assets/img/login-img.jpg"} alt="login-img" width={400} height={400}
                    className="rounded-l-xs rounded-r-lg h-full z-10 "
                />
            </section>

        </section>
    )
}