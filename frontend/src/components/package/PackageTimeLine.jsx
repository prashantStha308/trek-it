import Card from "@/components/layout/Card";
import {formatDate} from "@/utils/utils.helper.js";


export default function PackageTimeLine ({timeLines}){

    return(
        <Card title="Timeline">
            <div className="flex flex-col gap-3">
            {
                timeLines.map((lbl) => (

                    <div key={lbl.label} className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${lbl.color}`} />

                        <div>
                            <p className="text-xs text-text/50 uppercase tracking-wide">
                                {lbl.label}
                            </p>
                            <p className="text-sm font-medium text-text">
                                {formatDate(lbl?.date) || ""}
                            </p>
                        </div>
                    </div>
                ))
            }
            </div>
        </Card>
    )
}
