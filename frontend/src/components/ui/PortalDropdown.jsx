

// STILL BUILDING

import {useState, useEffect, useRef} from "react";
import {motion} from "motion/react";
import {
} from "lucide-react";


export default function PortalDropdown({ children, button }){
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({});

    const triggerRef = useRef(null);

    const handleOpen = () => {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
        setOpen((prev) => !prev);
    };


    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (
                !triggerRef.current?.contains(e.target) &&
                !listRef.current?.contains(e.target)
            ) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);


	return(
		<section
			ref={triggerRef}
			className="flex flex-col"
		>
			{button}


		</section>
	)
}