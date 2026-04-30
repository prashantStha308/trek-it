"use client"

import { ChevronDown, Check } from "lucide-react";
import { createPortal } from "react-dom";
import { useRef, useState, useEffect } from "react";
import {motion} from "motion/react";

export const TextInput = ({ type = "text", label = "label", placeholder, name, id, sideItem, callback, pattern, value, handleChange, required=false }) => {
    return (
        <div
            className="flex flex-col gap-1 w-full"
        >
            <label
                htmlFor="email"
                className="text-xs text-text/75 pl-1"
            >
                {label}:
            </label>
            
            <div
                className="flex items-center gap-4 text-sm justify-between border border-border focus-within:border-primary bg-primary/15 rounded-lg px-4 py-1 overflow-y-hidden group"
            >
                <input
                    type={type} name={name} id={id}
                    className="outline-none flex-1 appearance-none bg-transparent"
                    placeholder={placeholder}
                    pattern={pattern}
                    value={value}
                    onChange = {handleChange}
                    required={required}
                />

                <button
                    className="cursor-pointer group/btn flex gap-2 items-center"
                    onClick={callback}
                    type="button"
                >
                    <div
                        className="w-0.5 h-0 group-focus-within:h-4 group-hover/btn:h-4 rounded-full bg-primary transition-all ease-in-out duration-75"
                    />
                    
                    {sideItem}
                
                </button>
            </div>
        </div>
    )
}


export const SelectInput = ({ id, name, label, optionObjArray = [], value, handleChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(optionObjArray[0]);
    const [coords, setCoords] = useState({});
    
    const triggerRef = useRef(null);
    const listRef = useRef(null);

    const handleOpen = () => {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
        setOpen(prev => !prev);
    };

    const handleSelect = (e, option) => {
        e.stopPropagation();
        setSelected(option);
        setOpen(false);
        handleChange({
            target: {
                name: name,
                value: option.value
            }
        });
    };

    useEffect(() => {
        const handler = (e) => {
            if (triggerRef.current && !triggerRef.current.contains(e.target) && 
                 listRef.current && !listRef.current.contains(e.target)
             ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="flex flex-col gap-1 w-full cursor-pointer ">
            <label htmlFor={id} className="text-xs text-text/75 pl-1">{label}:</label>
            <button
                ref={triggerRef}
                type="button"
                onClick={handleOpen}
                className="flex items-center justify-between w-full border border-border focus:border-primary bg-primary/15 rounded-lg px-4 py-1 outline-none text-text/75 text-sm capitalize"
            >
                <span>{value || "Select.." }</span>
                <ChevronDown size={16} />
            </button>

            {open && createPortal(
                <ul
                    ref={listRef}
                    style={{ top: coords.top, left: coords.left, width: coords.width }}
                    className="absolute z-[9999] mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden"
                >
                    {optionObjArray.map((option, index) => (
                        <li
                            key={index}
                            onClick={(e) => handleSelect(e, option)}
                            className="px-6 py-2 hover:bg-primary/15 cursor-pointer text-sm"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>,
                document.body
            )}

            {/*<input type="hidden" name={name} id={id} value={selected?.value ?? ""} className="opacity-0 absolute -z-50" />*/}
        </div>
    );
}


export const ListBox = ({
    label,
    listItems = [],
    selected=[],
    handleSelect,

})=>{

    return(
        <ul
            className="w-full h-full overflow-y-scroll scrollbar-none flex flex-col gap-4 "
        >
            {
                listItems.map((item, index)=>{

                    const isSelected = selected.find(i => i == item)

                    return(
                        <li
                            key={index}
                            className="relative"
                        >
                            <div
                                className={` ${isSelected ? "opacity-100" : "opacity-0"} absolute z-20 top-2 text-text right-4 bg-primary/45 rounded-full p-0.5`}
                            >
                                <Check size={15} />
                            </div>

                            <motion.article
                                animate={{
                                    scale: isSelected ? 0.96 : 1,
                                    opacity: isSelected ? 0.4 : 1
                                }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeInOut"
                                }}
                                className={`bg-secondary/70 hover:bg-secondary text-text px-8 py-2 2xl:py-4 text-sm capitalize rounded-md cursor-pointer relative`}

                                onClick = {()=> handleSelect(item)}

                            >
                                {item}
                            </motion.article>
                        </li>
                    )
                })
            }
        </ul>
    )
}