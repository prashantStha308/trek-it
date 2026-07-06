import Link from "next/link";
import {THEME_COLOR, THEME_SIZE} from "@/constants/theme.constants.js";

import {useGlobalSearch} from "@/hooks/useGlobalSearch.jsx";


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
  size="sm",
  onClick,
  children,
  className,
  disabled = false,
}) => {

    return (
        <button
            className={`border rounded-md ${THEME_SIZE[size]} focus:outline-1 transition-colors ${THEME_COLOR[color][variant]} flex items-center justify-center gap-2 flex ${className ? className : "w-full"} disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}


export const LinkButton = ({ variant = "default", color="green", size="sm" , href, children, className = ""  })=>{

    const { setIsSearchModalOpen } = useGlobalSearch();

    return (
        <Link
            href={href}
            className={`border rounded-md ${THEME_SIZE[size]} cursor-pointer focus:outline-1 transition-colors ${THEME_COLOR[color][variant]} flex items-center justify-between flex justify-center`}
        >
            <div onClick={()=> setIsSearchModalOpen(false) } >
                {children}
            </div>
        </Link>
    )
}
