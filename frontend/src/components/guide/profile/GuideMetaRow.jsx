import { MapPin,Venus,Mars } from "lucide-react";


export default function GuideMetaRow({ guide }) {
	
	return (
		<div className="flex items-center gap-3 text-sm text-text/60">
			<span className="capitalize">{guide?.role}</span>

			{
				guide?.address?.country && (
					<span className="flex items-center gap-1 capitalize">
						<MapPin size={13} /> {guide?.address?.country}
					</span>
				)
			}

			{
				guide?.gender && guide?.age && (
					<div className="capitalize flex items-center gap-1 ">
						<span>
							{guide?.gender === "female" ? <Venus size={13} /> : <Mars size={13} /> }
						</span>

						<span>
							{guide?.gender}, {guide?.age}
						</span>
					</div>
				)
			}
		</div>
	);
}