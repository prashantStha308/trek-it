import {RightIcon, LeftIcon} from "./Icons";


export default function TextInput ({
    type = "text", label,
    placeholder, name, id,
    rightIcon,
    leftIcon,
    callback,
    pattern,
    value, handleChange,
    required=false
}){
    return (
        <div
            className="flex flex-col gap-1 w-full"
        >
            {
                label &&
                <label
                    htmlFor="email"
                    className="text-xs text-text/75 pl-1"
                >
                    {label}:
                </label>
            }
            
            <div
                className="flex items-center gap-4 text-sm justify-between border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-1 overflow-y-hidden group"
            >
                {
                    leftIcon && <LeftIcon leftIcon={leftIcon} callback={callback} />
                }

                <input
                    type={type} name={name} id={id}
                    className="outline-none flex-1 appearance-none bg-transparent"
                    placeholder={placeholder}
                    pattern={pattern}
                    value={value}
                    onChange = {handleChange}
                    required={required}
                />
                {
                    rightIcon && <RightIcon rightIcon={rightIcon} callback={callback} />
                }
            </div>
        </div>
    )
}
