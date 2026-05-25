import { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function BreadCrumbs({}) {
    const itemRefs = useRef([]);
    const [itemClasses, setItemClasses] = useState([]);

    const stops = ["Kathmandu", "Pokhara", "Fanglung", "Fidim", "Illam", "Dharan", "Kathmandu", "Dharan", "Kathmandu"];

    const checkEdge = (element) => {
        const childRect = element.getBoundingClientRect();
        const parentRect = element.parentElement.getBoundingClientRect();

        const isLeftMost  = Math.abs(childRect.left - parentRect.left) < 1;
        const isRightMost = Math.abs(childRect.right - parentRect.right) < 1;
        const isTop = Math.abs(childRect.top - parentRect.top) < 1;
        const isBottom = Math.abs(childRect.bottom - parentRect.bottom) < 1;

        let className = "border border-primary/75";

        if (isLeftMost  && isTop)    className += " rounded-tl-lg";
        else if (isLeftMost  && isBottom) className += " rounded-bl-lg";
        else if (isRightMost && isTop)    className += " rounded-tr-lg";
        else if (isRightMost && isBottom) className += " rounded-br-lg";

        return className;
    };

	useEffect(() => {
	    const compute = () => {
	        const elements = itemRefs.current.filter(el => el !== null);
	        if (!elements.length) return;

	        // Group elements into rows by their top position
	        const rows = [];
	        elements.forEach((el, i) => {
	            const rect = el.getBoundingClientRect();
	            const rowTop = Math.round(rect.top);
	            const existing = rows.find(r => r.top === rowTop);
	            if (existing) {
	                existing.items.push({ el, index: i });
	            } else {
	                rows.push({ top: rowTop, items: [{ el, index: i }] });
	            }
	        });

	        let classes = [];

	        rows.forEach((row, rowIndex) => {
	            const isFirstRow = rowIndex === 0;
	            const isLastRow  = rowIndex === rows.length - 1;

	            row.items.forEach((item, colIndex) => {
	                const isFirstCol = colIndex === 0;
	                const isLastCol  = colIndex === row.items.length - 1;

	                let extra = "";
	                if (isFirstRow && isFirstCol) extra += " rounded-tl-lg";
	                if (isFirstRow && isLastCol)  extra += " rounded-tr-lg"; 
	                if (isLastRow  && isFirstCol) extra += " rounded-bl-lg";
	                if (isLastRow  && isLastCol)  extra += " rounded-br-lg"; 

	                classes[item.index] = "border border-primary/75" + extra;
	            });
	        });

	        setItemClasses(classes);
	    };

	    compute();
	    window.addEventListener("resize", compute);
	    return () => window.removeEventListener("resize", compute);
	}, []);

    return (
    	<section className="w-full flex justify-center" >
	        <section className=" w-fit flex flex-wrap items-center justify-start text-text/75 ">
	            {stops.map((item, index) => (
	                <div
	                    key={index}
	                    ref={el => itemRefs.current[index] = el}
	                    className={`${itemClasses[index] || " border border-primary/75"} h-full px-4 py-1 text-center flex items-center gap-2 hover:bg-primary/75 cursor-pointer text-xs`}
	                >
	                    <span>{item}</span>
	                    <span className={`text-text/45 ${index == stops.length - 1 && "opacity-0" } `}><ChevronRight size={index == stops.length - 1 ? 20 : 20 } /></span>
	                </div>
	            ))}
	        </section>
    	</section>
    );
}