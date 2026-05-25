import Link from "next/link";
/**
 * @param {Object} props
 * @param {string} props.text
 * @param {"primary" | "outline" | "form"} props.variant
 * @param {Function} handleClick - onClick handler
 */
export const Button = ({
  variant = "outline",
  type = "button",
  onClick,
  children,
  className,
  disabled = false,
}) => {
  const variants = {
    primary:
      "border-primary/60 py-1 text-sm bg-primary/85 text-white hover:bg-primary",
    form: "border-accent/60 dark:border-secondary/60 py-1 text-sm bg-primary/75 dark:bg-primary/65 text-white hover:dark:bg-secondary/75 hover:bg-accent/75",
    default:
      "border-primary/60 py-1 text-sm hover:bg-primary/85 hover:text-white",
  };

    return (
        <button
            className={`border rounded-md px-4 cursor-pointer focus:outline-1 transition-colors ${variants[variant] ?? variants.default} flex items-center justify-between gap-2 flex justify-center ${className ? className : "w-full" } `}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}


export const LinkButton = ({ variant = "default", size="sm" , href, children,  })=>{
    
    const sizes={
        sm: "px-2 py-1 gap-1 text-xs",
        md: "px-4 py-1 gap-2 text-sm",
        lg: "px-6 py-2 gap-2 text-lg",
        xl: "px-8 py-4 gap-4 text-xl"
    }

    const variants = {
        primary: "border-primary/60 bg-primary/85 text-white hover:bg-primary",
        form: "border-accent/60 dark:border-secondary/60 bg-primary/75 dark:bg-primary/65 text-white hover:dark:bg-secondary/75 hover:bg-accent/75",
        default: "border-primary/60 hover:bg-primary/85 hover:text-white",
    }

    return (
        <Link
            href={href}
            className={`border rounded-md ${sizes[size]} cursor-pointer focus:outline-1 transition-colors ${variants[variant] ?? variants.default} flex items-center justify-between flex justify-center`}
        >
            {children}
        </Link>
    )
}
