export default function Toggle({ label, description, value, onToggle }) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-xs text-text/75 pl-1">{label}</label>
            )}

            <div
                onClick={onToggle}
                className="flex items-center justify-between border border-border bg-primary/5 rounded-lg px-4 py-2 cursor-pointer"
            >
                <div className="flex flex-col">
                    <span className="text-sm text-text/75">{label}</span>
                    {description && (
                        <span className="text-xs text-text/40">{description}</span>
                    )}
                </div>

                <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ${value ? "bg-primary" : "bg-border"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? "left-5" : "left-0.5"}`} />
                </div>
            </div>
        </div>
    );
}