import Card from "@/components/layout/Card";
import { formatDate } from "@/utils/utils.helper.js";
import { MapPin, Moon, Coffee, Flag, Sparkles } from "lucide-react";

const TYPE_STYLES = {
    meetpoint:  { icon: MapPin, bg: "bg-primary/10", border: "border-primary/30",  dot: "bg-primary",  text: "text-primary" },
    overnight:  { icon: Moon, bg: "bg-accent/10", border: "border-accent/30",   dot: "bg-accent",   text: "text-accent" },
    rest:       { icon: Coffee, bg: "bg-amber-400/10", border: "border-amber-400/30", dot: "bg-amber-400", text: "text-amber-600" },
    checkpoint: { icon: Flag, bg: "bg-red-500/10",  border: "border-red-500/30",  dot: "bg-red-500",  text: "text-red-500" },
    other:      { icon: Sparkles, bg: "bg-secondary/20", border: "border-secondary/40", dot: "bg-secondary-dark", text: "text-secondary-dark" },
};

export default function PackageTimeLineStops({ timeLines }) {
    return (
        <Card title="Timeline">
            <div className="flex flex-wrap gap-3">
                {
                    timeLines.map((lbl) => {
                        const style = TYPE_STYLES[lbl.rawType] || TYPE_STYLES.meetpoint;
                        const Icon = style.icon;

                        return (
                            <div
                                key={lbl.label}
                                className={`flex items-start gap-2.5 rounded-lg px-4 py-3 border ${style.bg} ${style.border} min-w-[150px]`}
                            >
                                <div className={`mt-0.5 rounded-full p-1.5 ${style.dot}/15`}>
                                    <Icon size={14} className={style.text} />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <p className="text-[10px] font-semibold text-text/45 uppercase tracking-wider">
                                        {lbl.label}
                                    </p>
                                    <p className="text-sm font-semibold text-text leading-tight">
                                        {lbl.date ? formatDate(lbl.date) : lbl.location || ""}
                                    </p>
                                    {lbl.reason && (
                                        <p className={`text-[11px] font-medium capitalize ${style.text}`}>
                                            {lbl.reason}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </Card>
    )
}