/**
 * @param {Object} props
 * @param {string} props.text
 * @param {"primary" | "outline" | "form"} props.variant
 * @param {Function} handleClick - onClick handler
 */
export const Button = ({ text, variant = "outline", type="button", handleClick }) => {
    
    const variants = {
        primary: "border-primary/60 py-1 text-sm bg-primary/85 text-white hover:bg-primary",
        form: "border-accent/60 dark:border-secondary/60 py-1 text-sm bg-primary/75 dark:bg-primary/65 text-white hover:dark:bg-secondary/75 hover:bg-accent/75",
        default: "border-primary/60 py-1 text-sm hover:bg-primary/85 hover:text-white",
    }

    return (
        <button
            className={`border rounded-lg px-4 cursor-pointer focus:outline-1 transition-colors ${variants[variant] ?? variants.default}`}
            type={type}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}