import { Star } from "lucide-react";

export default function GuideStatsRow({ guide }) {
	
	return (
		<div className="flex items-center gap-1 text-sm text-text/70">
			<Star size={14} className="text-amber-400 fill-amber-400" />

			<span>{guide?.rating || 0}</span>

			<span className="text-text/40">·</span>
			<span>{guide?.trekCount || 0} treks completed</span>
			<span className="text-text/40">·</span>

			<span>{guide?.packageCount || 0} packages</span>
		</div>
	);
}