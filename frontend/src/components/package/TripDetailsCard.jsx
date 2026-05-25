import Card from "@/components/layout/Card";
import {  Tag, ShieldAlert, ShieldCheck, Calendar, Users } from "lucide-react";


export default function TripDetails({data}) {
    const items = [
        { icon: <Calendar size={15} />, label: "Duration",value:`${data?.daysAlloted} days` },
        { icon: <Users size={15} />,label: "Group size", value: `Up to ${data?.maxGroupSize}` },
        { icon: <Tag size={15} />, label: "Type", value: data?.type },
        {
            icon: data?.requiresPermit ? <ShieldAlert size={15} /> : <ShieldCheck size={15} />,
            label: "Permit",
            value: data?.requiresPermit ? "Required" : "Not required",
        },
    ];

    return (
        <Card title="Trip details">
            <div className="grid grid-cols-2 gap-3">
                {items.map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2 bg-primary/5 rounded-lg px-3 py-3">
                        <span className="text-text/50 mt-0.5">{icon}</span>
                        <div>
                            <p className="text-xs text-text/50 mb-0.5">{label}</p>
                            <p className="text-sm font-medium text-text capitalize">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}