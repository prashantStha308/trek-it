import {THEME_COLOR, THEME_SIZE} from "@/constants/theme.constants.js";

export default function Badge({ children, variant = "default", size = "md" }) {

    return (
        <span className={`inline-flex items-center rounded-full font-medium tracking-wide capitalize cursor-pointer ${THEME_COLOR[variant].badge} ${THEME_SIZE[size]}`}>
            {children}
        </span>
    );
}