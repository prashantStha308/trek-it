import Link from "next/link";
import {THEME_COLOR, THEME_SIZE} from "@/constants/theme.constants.js";

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {"primary" | "outline" | "form"} props.variant
 * @param {Function} handleClick - onClick handler
 */
export const Button = ({
  variant = "outline",
  color="green",
  type = "button",
  onClick,
  children,
  className,
  disabled = false,
}) => {

    return (
        <button
            className={`border rounded-md px-4 cursor-pointer focus:outline-1 transition-colors ${THEME_COLOR[color][variant] } flex items-center justify-center gap-2 flex ${className ? className : "w-full" } `}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}


export const LinkButton = ({ variant = "default", color="green", size="sm" , href, children, className = ""  })=>{

    return (
        <Link
            href={href}
            className={`border rounded-md ${THEME_SIZE[size]} cursor-pointer focus:outline-1 transition-colors ${THEME_COLOR[color][variant]} flex items-center justify-between flex justify-center`}
        >
            {children}
        </Link>
    )
}
