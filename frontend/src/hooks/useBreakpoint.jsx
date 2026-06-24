"use client"

import { useEffect, useState } from "react"

const useBreakpoint = ( breakpoint = 640 )=>{
    const [ isBreakpoint , setIsBreakpoint ] = useState(false);

    useEffect(()=>{
        const handleResize = ()=>{
            setIsBreakpoint(window.innerWidth < breakpoint);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    } , [breakpoint])

    return isBreakpoint;
}

export default useBreakpoint;