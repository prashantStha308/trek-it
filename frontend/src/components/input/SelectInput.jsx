"use client";

import {useState, useEffect, useRef} from "react";
import { createPortal } from "react-dom";

import {ChevronDown} from "lucide-react";
import {RightIcon, LeftIcon} from "./Icons";

export default function SelectInput ({
    id, name, label,
    optionObjArray = [], //{label, value}
    value, handleChange,
    leftIcon, rightIcon,
    className
}){
    const [open, setOpen] = useState(false);
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
        setOpen((prev) => !prev);
    };

    const handleSelect = (e, option) => {
        e.stopPropagation();
        setOpen(false);
        handleChange({ target: { name, value: option.value, label: option.label } });
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

    useEffect(() => {
        if (!open) return;
        const handler = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    return (
        <div className={`flex flex-col gap-1 ${className ?? "min-w-44 max-w-44"}`}>
            {label && (
                <label htmlFor={id} className="text-xs text-text/75 pl-1">
                    {label}:
                </label>
            )}
            <div className="flex items-center gap-2 border border-border focus-within:border-primary bg-primary/15 rounded-lg px-4 py-1 group ">
                {leftIcon && <LeftIcon leftIcon={leftIcon} /> }

                <button
                    ref={triggerRef}
                    type="button"
                    id={id}
                    onClick={handleOpen}
                    className="flex items-center justify-between flex-1 outline-none text-text/75 text-sm capitalize whitespace-nowrap gap-2 overflow-hidden"
                >
                    <span className="truncate">{value || "Select..."}</span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}
                    />
                </button>
                
                {rightIcon && <RightIcon rightIcon={rightIcon} />}
            </div>

            {open && createPortal(
                    <ul
                        ref={listRef}
                        role="listbox"
                        style={{ top: coords.top, left: coords.left, width: Math.max(coords.width, 160) }}
                        className="absolute z-[9999] mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                    {optionObjArray.map((option, index) => (
                        <li
                            key={option.value ?? index}
                            onClick={(e) => handleSelect(e, option)}
                            className={`px-6 py-2 text-sm cursor-pointer transition-colors ${
                                value === option.value
                                    ? "bg-primary/20 text-text font-medium"
                                    : "hover:bg-primary/15"
                            }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>,
                document.body
            )}
        </div>
    );
};