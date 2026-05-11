"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Levels
import RegisterLevel1 from "./_forms/RegisterLevel1";
import RegisterLevel2 from "./_forms/RegisterLevel2";
import TouristLevel3 from "./_forms/TouristLevel3";
import GuideLevel3 from "./_forms/GuideLevel3";

// Queries
import {useRegister} from "@/queries/auth.query";
import { useGetActivities } from "@/queries/meta.query";

// Components
import {showToast} from "@/store/ui.store";
import { Button } from "@/components/ui/Button";


const Header = ({currentLevel, handleBack}) => {
    return (
        <header
            className=" px-6 py-4 flex justify-between items-center w-full h-fit "
        >
            <button
                className={`text-text cursor-pointer p-2 hover:bg-secondary/20 rounded-full ${currentLevel !== 1 ? "opacity-100" : "opacity-0" }`}
                onClick={currentLevel !== 1 ? handleBack : undefined}
                type={"button"}
            >
                <ChevronLeft size={20} />
            </button>

            <h2 className="text-sm font-semibold text-text/75">
                Trek-It
            </h2>
            <div className="h-8 w-8 object-cover bg-secondary rounded-full" >
                <Image src={"/assets/svg/ico_2.svg"} alt={"logo"} width={100} height={100} 
                    className=" w-8"
                />
            </div>

        </header>

    )
}

const Levels = ({currentLevel = 1, role = "", handleChange, formData, listItems, isListLoading})=>{
    let form;

    if(currentLevel == 1){
        form = <RegisterLevel1 handleChange={handleChange} formData={formData} />
    }else if(currentLevel == 2){
        form = <RegisterLevel2 handleChange={handleChange} formData={formData} />
    }else if(currentLevel == 3){

        if(role === "tourist"){
            form = <TouristLevel3 handleChange={handleChange} formData={formData} listItems={listItems} isListLoading={isListLoading} />
        }else if(role === "guide"){
            form = <GuideLevel3 handleChange={handleChange} formData={formData} />
        }else{
            throw new Error("Invalid role")
        }

    }

    return (
        <>
            {form}
        </>
    );

}

export default function Register() {
    
    const [currentLevel, setCurrentLevel] = useState(3);
    const [formData, setFormData] = useState({
        // level 1
        name: "",
        email: "",
        password: "",
        gender: "",
        age: "",

        // level 2
        role: "guide",
        address: {
            country: "",
            city: ""
        },

        // level 3 (tourist)
        interests: [],
        
        // level 3 (guide)
        languages:[],
        regions: [],
        specialities: []
    });

    const {data:activities, isLoading: isListLoading} = useGetActivities();
    const register = useRegister();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentLevel < 3) return;

        const { role, ...body } = formData;
        const res = await register.mutateAsync({ body, role });

        router.push("/login");
    }

    const handleChange = ({ target: { name, value } }) => {

        console.log("HandleChange at register: ", {name, value})

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

    const handleNext = (e) => {
         e.preventDefault()  
        e.stopPropagation()

        if (currentLevel === 3) return; 

        if (currentLevel === 2 && formData.role.trim() === "") {
            showToast({title: "Role not defined", message: "Please specify your role"});
            return;
        }

        if (currentLevel !== 3) {
            setCurrentLevel(state => state >= 3 ? 3 : state + 1);
        }
    };

    const handleBack = () => {
        setCurrentLevel(state => state <= 1 ? 1 : state - 1);
    }


    return (
        <section
            id="register-page"
            className="flex flex-1 justify-between align-bottom relative h-full w-full "
        >
            <section
                className="flex flex-1 flex-col h-4/5 justify-between items-stretch h-full min-w-0 "
            >
                <Header currentLevel={currentLevel} handleBack={handleBack} />

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col justify-between gap-8 min-w-0 py-6"
                >
                    {/*<RegisterLevel1 />*/}
                    <Levels currentLevel={currentLevel} role={formData.role} handleChange={handleChange} formData={formData} listItems={activities} isListLoading={isListLoading} />

                    <div className="flex w-full justify-center" >
                        <Button
                            type={ currentLevel === 3 ? "submit" : "button" }
                            variant="form"
                             onClick={currentLevel < 3 ? handleNext : undefined}
                            className="w-11/12"
                        >
                            { currentLevel < 3 ? "Next" : "Complete Registration" }
                            </Button>
                    </div>
                </form>

            </section>

            <div className="hidden dark:block absolute h-full w-sm dark:bg-teal-500/15 blur-3xl -z-10 right-20" />
    
            <section id="register-image" className="hidden lg:flex relative isolate">
                <Image src={"/assets/img/login-img.jpg"} alt="login-img" width={400} height={400}
                    className="rounded-l-xs rounded-r-lg h-full z-10 object-cover w-md"
                />
            </section>

        </section>
    )
}