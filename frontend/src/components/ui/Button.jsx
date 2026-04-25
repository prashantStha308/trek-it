/**
 * @param {Object} props
 * @param {string} props.text
 * @param {"primary" | "outline" | "form"} props.variant
 */
export const Button = ({ text, variant = "outline", type="button" }) => {
    
    const variants = {
        primary: "border-primary/60 py-1 text-sm bg-primary/85 text-white hover:bg-primary",
        form: "border-accent/60 py-2 text-base bg-accent/85 text-white hover:bg-primary/65",
        default: "border-primary/60 py-1 text-sm hover:bg-primary/85 hover:text-white",
    }

    return (
        <button
            className={`border rounded-lg px-4 cursor-pointer focus:outline-1 transition-colors ${variants[variant] ?? variants.default}`}
            type={type}
        >
            {text}
        </button>
    )
}