import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import useCitiesStore from "@/store/cities.store.js";
import { ChevronDown, Pin } from "lucide-react";

export default function CitySelector({ city, setCity }) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState("");

    const triggerRef = useRef();
    const listRef = useRef();
    const inputRef = useRef();

    const cities = useCitiesStore((store) => store.cities);
    const { loadCities } = useCitiesStore.getState();

    const filteredCities = keyword
        ? cities.filter((city) =>
              city.name?.toLowerCase().startsWith(keyword.toLowerCase())
          )
        : cities;

    const handleOpen = () => {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
        setOpen((prev) => {
            if (prev) setKeyword(""); // reset on close
            return !prev;
        });
    };

    // focus input after dropdown opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    const handleSelect = (e, option) => {
        e.stopPropagation();
        setCity(option);
        setKeyword("");
        setOpen(false);
    };

    useEffect(() => {
        if (!cities || cities.length === 0) {
            const load = async () => {
                setIsLoading(true);
                await loadCities();
                setIsLoading(false);
            };
            load();
        }
    }, []); 

    useEffect(() => {
        const handler = (e) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                listRef.current &&
                !listRef.current.contains(e.target)
            ) {
                setOpen(false);
                setKeyword("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const dropdown = open
        ? createPortal(
              <ul
                  ref={listRef}
                  role="listbox"
                  style={{
                      top: coords.top,
                      left: coords.left,
                      width: Math.max(coords.width, 160),
                  }}
                  className="absolute z-[9999] mt-2 bg-background border border-border rounded-xl shadow-lg overflow-y-auto max-h-60"
              >
                  {!isLoading ? (
                      filteredCities.length > 0 ? (
                          filteredCities.map((option, index) => (
                              <li
                                  key={index}
                                  onClick={(e) => handleSelect(e, option)}
                                  className={`px-6 py-2 text-sm cursor-pointer transition-colors ${
                                      city?.name === option.name
                                          ? "bg-primary/20 text-text font-medium"
                                          : "hover:bg-primary/15"
                                  }`}
                              >
                                  {option.name}
                              </li>
                          ))
                      ) : (
                          <li className="px-6 py-2 text-sm text-text/50">
                              No cities found.
                          </li>
                      )
                  ) : (
                      <li className="px-6 py-2 text-sm text-text/50">
                          Loading cities...
                      </li>
                  )}
              </ul>,
              document.body
          )
        : null;

    return (
        <div className="flex flex-col gap-1 min-w-44 max-w-44">
            <label className="text-xs text-text/75 pl-1">Cities:</label>
            <div
                ref={triggerRef}
                onClick={handleOpen}
                className="group relative flex items-center gap-2 border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-1 group cursor-pointer"
            >

                <div className="h-full flex items-center gap-2 text-text/75" >
                    <Pin size={20} />

                    <div className="w-0.5 h-0 group-focus-within:h-5 bg-primary transition-all ease-in-out duration-75" />
                </div>

                <div className="flex items-center gap-2 px-2" >
                    {open ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Search City..."
                            className="flex-1 outline-none text-sm bg-transparent text-text placeholder:text-text/40 min-w-0"
                        />
                    ) : (
                        <span className="flex-1 text-sm text-text/75 capitalize truncate">
                            {city?.name ?? "Select..."}
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={16}
                    className={`absolute right-5 transition-transform duration-150 shrink-0 text-text/75 ${open ? "rotate-180" : ""}`}
                />

            </div>
            {dropdown}
        </div>
    );
}