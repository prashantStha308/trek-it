export default function TextArea({
	label="", name, id,
	value, handleChange,
	rows, cols,
	placeholder=""
}){
	return(
        <div
            className="flex flex-col gap-1 w-full"
        >
            <label
                htmlFor="email"
                className="text-xs text-text/75 pl-1"
            >
                {label}
            </label>
            
            <div
                className="flex items-center gap-4 text-sm justify-between border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-1 overflow-y-hidden group"
            >

                <textarea
                    name={name} id={id}
                    className="outline-none flex-1 appearance-none bg-transparent resize-none"
                    placeholder={placeholder}
                    value={value}
                    onChange = {handleChange}
                    rows={4}
                />
            </div>
            
        </div>
	)
}