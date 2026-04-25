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
            className="flex justify-between gap-2 bg-green-100 dark:bg-neutral-800 rounded-full py-3 px-8 text-sm w-lg  border border-green-300 focus-within:border-green-700 dark:focus-within:border-neutral-600 text-neutral-200 transition-all ease-in-out duration-150 group "
        >
            <label htmlFor="search" className="sr-only">
                Search guides
            </label>

            <input
                id="search"
                type="text"
                placeholder="Search by language, location, name..."
                className="outline-none text-base w-full bg-transparent text-neutral-900 dark:text-neutral-200"
            />
            <button
                aria-label="Submit search"
                type="submit"
                className="flex items-center justify-between gap-2 cursor-pointer group/btn"
            >
                <div
                    className="bg-green-700 dark:bg-neutral-300 w-0.5 h-0 group-hover/btn:h-full group-focus-within:h-full transition-all ease-in-out duration-300 rounded-full"
                ></div>
                <Search
                    size={20}
                    // color="oklch(52.7% 0.154 150.069)"
                    className="text-green-700 dark:text-neutral-300"
                />
            </button>
        </form>
    )
}