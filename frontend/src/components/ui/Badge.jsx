import {THEME_COLOR, THEME_SIZE} from "@/constants/theme.constants.js";

export default function Badge({ children, variant = "default", size = "md" }) {
    // const variants = {
    //     default: "bg-stone-100 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300",
    //     green: "bg-primary text-green-100 dark:bg-primary/30 dark:text-green-100",
    //     amber: "bg-amber-400 text-amber-900",
    //     red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    //     blue: "bg-sky-50 text-accent dark:bg-accent/10 dark:text-accent",
    // };

    // const sizes = {
    //     xs: "px-1.5 py-0 text-[10px] gap-1",
    //     sm: "px-2 py-0.5 text-xs gap-1",
    //     md: "px-3 py-1 text-xs gap-1.5",
    //     lg: "px-4 py-1.5 text-sm gap-1.5",
    //     xl: "px-5 py-2 text-sm gap-2",
    // }

    return (
        <span className={`inline-flex items-center rounded-full font-medium tracking-wide capitalize cursor-pointer ${THEME_COLOR[variant].badge} ${THEME_SIZE[size]}`}>
            {children}
        </span>
    );
}