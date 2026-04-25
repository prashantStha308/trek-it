"use client"

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Levels
import RegisterLevel1 from "./_forms/RegisterLevel1";
import RegisterLevel2 from "./_forms/RegisterLevel2";
import TouristLevel3 from "./_forms/TouristLevel3";
import GuideLevel3 from "./_forms/GuideLevel3";



const Header = ({currentLevel, handleBack}) => {
    return (
        <header
            className=" px-6 py-2 flex justify-between items-center w-full h-10 "
        >
            <button
                className={`text-text/75 cursor-pointer p-2 hover:bg-secondary/20 rounded-full ${currentLevel !== 1 ? "opacity-100" : "opacity-0" }`}
                onClick={currentLevel !== 1 ? handleBack : undefined}
                type={"button"}
            >
                <ChevronLeft size={16} />
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

const Levels = ({currentLevel = 1, role = "", handleNext, handleChange, formData})=>{
    let form;

    if(currentLevel == 1){
        form = <RegisterLevel1 handleNext={handleNext} handleChange={handleChange} formData={formData} />
    }else if(currentLevel == 2){
        form = <RegisterLevel2 handleNext={handleNext} handleChange={handleChange} formData={formData} />
    }else if(currentLevel == 3){

        if(role === "tourist"){
            form = <TouristLevel3 handleChange={handleChange} formData={formData} />
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
    
    const [currentLevel, setCurrentLevel] = useState(1);
    const [formData, setFormData] = useState({
        // level 1
        name: "",
        email: "",
        password: "",
        gender: "",
        age: 0,

        // level 2
        role: "",
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

    const handleSubmit = () => {
        // code
    }

    const handleChange = ({ target: { name, value } }) => {

        console.log(`${name}: ${value}`);

        if (name.includes(".")) {
            // handle nested object

            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));

        } else {
            // Normal values

            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => {
        if (currentLevel === 2 && formData.role.trim() === "") {
            throw new Error("Please specify your role");
            return;
        }

        if (currentLevel === 3) {
            handleSubmit();
        } else {
            setCurrentLevel(state => state >= 3 ? 3 : state + 1);
        }
    };

    const handleBack = () => {
        setCurrentLevel(state => state <= 1 ? 1 : state - 1);
    }


    return (
        <section
            id="register-page"
            className="flex flex-1 justify-between relative overflow-hidden h-full w-full "
        >
            <form className="flex flex-1 flex-col h-full justify-between gap-8 min-w-0 py-6">
                <Header currentLevel={currentLevel} handleBack={handleBack} />

                {/*<RegisterLevel1 />*/}
                <Levels currentLevel={currentLevel} role={formData.role} handleNext={handleNext} handleChange={handleChange} formData={formData} />

            </form>

            <div className="hidden dark:lg:block absolute h-full w-sm dark:bg-teal-500/15 blur-3xl -z-10 right-20" />
    
            <section id="register-image" className="hidden lg:flex relative isolate">
                <Image src={"/assets/img/login-img.jpg"} alt="login-img" width={400} height={400}
                    className="rounded-l-xs rounded-r-lg h-full z-10 object-cover"
                />
            </section>

        </section>
    )
}