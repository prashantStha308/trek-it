// STILL BUILDING
import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PortalDropdown({
    children,
    button,
    open: openProp,
    onOpenChange,
}) {
    const [openState, setOpenState] = useState(false);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : openState;

    const setOpen = (value) => {
        const next = typeof value === "function" ? value(open) : value;
        if (!isControlled) setOpenState(next);
        onOpenChange?.(next);
    };

    const triggerRef = useRef(null);
    const listRef = useRef(null);
    const [coords, setCoords] = useState({});

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
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        window.addEventListener("scroll", close, true);
        window.addEventListener("resize", close);
        return () => {
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("resize", close);
        };
    }, [open]);

    return (
        <section ref={triggerRef} className="flex flex-col" onClick={handleOpen}>
            {button}

            {createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={listRef}
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                top: coords.top,
                                left: coords.left,
                                minWidth: coords.width,
                                zIndex: 9999,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}