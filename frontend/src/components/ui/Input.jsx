function TextInput({ type = "text", label = "label", placeholder, name, id, sideItem, callback }) {
    return (
        <div
            className="flex flex-col gap-1 w-md"
        >
            <label
                htmlFor="email"
                className="text-sm text-text/75 pl-1"
            >
                {label}:
            </label>
            
            <div
                className="flex items-center gap-4 justify-between border border-border focus-within:border-primary bg-primary/15 rounded-xl px-6 py-2 overflow-y-hidden group"
            >
                <input
                    type={type} name={name} id={id}
                    className="outline-none flex-1"
                    placeholder={placeholder}
                />

                <button
                    className="cursor-pointer group/btn flex gap-2 items-center"
                    onClick={callback}
                    type="button"
                >
                    <div
                        className="w-0.5 h-0 group-focus-within:h-6 group-hover/btn:h-6 rounded-full bg-primary transition-all ease-in-out duration-100"
                    ></div>
                    
                    {sideItem}
                
                </button>
            </div>
        </div>
    )
}

export { TextInput };