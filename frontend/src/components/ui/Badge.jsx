export default function Badge({ children, variant = "default", size = "md" }) {
    const variants = {
        default: "bg-stone-100 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300",
        green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        blue: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    };

    const sizes = {
        xs: "px-1.5 py-0 text-[10px] gap-1",
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-3 py-1 text-xs gap-1.5",
        lg: "px-4 py-1.5 text-sm gap-1.5",
        xl: "px-5 py-2 text-sm gap-2",
    }

    return (
        <span className={`inline-flex items-center rounded-full font-medium tracking-wide capitalize cursor-pointer ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
}