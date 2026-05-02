import {motion} from "motion/react";
import {Check} from "lucide-react";


export default function ListBox({
    label,
    listItems = [],
    selected=[],
    handleSelect,
}){

    return(
        <ul
            className="w-full h-full overflow-y-scroll scrollbar-none flex flex-col gap-4 "
        >
            {
                listItems.map((item, index)=>{

                    const isSelected = selected.find(i => i == item)

                    return(
                        <li
                            key={index}
                            className="relative"
                        >
                            <div
                                className={` ${isSelected ? "opacity-100" : "opacity-0"} absolute z-20 top-2 text-text right-4 bg-primary/45 rounded-full p-0.5`}
                            >
                                <Check size={15} />
                            </div>

                            <motion.article
                                animate={{
                                    scale: isSelected ? 0.96 : 1,
                                    opacity: isSelected ? 0.4 : 1
                                }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeInOut"
                                }}
                                className={`bg-secondary/70 hover:bg-secondary text-text px-8 py-2 2xl:py-4 text-sm capitalize rounded-md cursor-pointer relative`}

                                onClick = {()=> handleSelect(item)}

                            >
                                {item}
                            </motion.article>
                        </li>
                    )
                })
            }
        </ul>
    )
}