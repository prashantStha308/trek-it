import { Search } from "lucide-react"

export function SearchBar() {

    const handleSubmit = (e) => {
        e.preventDefault();
        // perform query
    }

    return (
        <form
            role="serach"
            onSubmit={handleSubmit}
            id="searchBar"
            className="flex justify-between gap-2  rounded-full py-4 px-8 text-sm w-lg  border border-border focus-within:border-primary bg-primary/15 text-text transition-all ease-in-out duration-150 group "
        >
            <label htmlFor="search" className="sr-only">
                Search guides
            </label>

            <input
                id="search"
                type="text"
                placeholder="Search by language, location, name..."
                className="outline-none text-sm w-full bg-transparent text-text"
            />
            <button
                aria-label="Submit search"
                type="submit"
                className="flex items-center justify-between gap-2 cursor-pointer group/btn"
            >
                <div
                    className="bg-primary  w-0.5 h-0 group-hover/btn:h-full group-focus-within:h-full transition-all ease-in-out duration-300 rounded-full"
                ></div>
                <Search
                    size={20}
                    className="text-text"
                />
            </button>
        </form>
    )
}