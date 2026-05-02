export const LeftIcon = ({ leftIcon, callback })=>{
    return(
        <button
            className="cursor-pointer group/btn flex gap-2 items-center text-text/75 self-stretch"
            onClick={callback}
            type="button"
        >
            {leftIcon}
            <div
                className="w-0.5 h-0 group-focus-within:h-full group-hover/btn:h-full rounded-full bg-primary transition-all ease-in-out duration-75"
            />
            
        
        </button>
    )
}

export const RightIcon = ({rightIcon, callback})=>{
    return(
        <button
            className="cursor-pointer group/btn flex gap-2 items-center text-text/75"
            onClick={callback}
            type="button"
        >
            <div
                className="w-0.5 h-0 group-focus-within:h-full group-hover/btn:h-full rounded-full bg-primary transition-all ease-in-out duration-75"
            />
            
            {rightIcon}
        
        </button>
    )
}