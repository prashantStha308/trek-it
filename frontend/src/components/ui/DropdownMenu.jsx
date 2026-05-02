export default function DropdownMenu({ open, children }) {
    return open ? (
        <ul className="absolute top-full left-0 mt-2 w-44 bg-background border border-black/10 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
            {children}
        </ul>
    ) : null;
}