export default function Badge({ children, variant = "default" }) {
    const variants = {
        default: "bg-stone-100 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300",
        green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        blue: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide capitalize ${variants[variant]}`}>
            {children}
        </span>
    );
}
