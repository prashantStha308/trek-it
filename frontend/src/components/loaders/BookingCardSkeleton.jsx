export default function BookingCardSkeleton() {
	return (
		<div className="rounded-xl border border-border p-4 animate-pulse bg-surface">
			
			<div className="flex justify-between items-start gap-3">
			
				<div className="flex-1 space-y-2">
					<div className="h-4 w-48 bg-muted/30 rounded-lg" />
					<div className="h-3 w-32 bg-muted/20 rounded-lg" />
					<div className="h-3 w-28 bg-muted/20 rounded-lg" />
				</div>
			
				<div className="space-y-2">
					<div className="h-5 w-16 bg-muted/20 rounded-full" />
					<div className="h-4 w-24 bg-muted/30 rounded-lg" />
				</div>
			</div>

			<div className="mt-3 pt-3 border-t border-border flex justify-between">
				<div className="h-3 w-48 bg-muted/20 rounded-lg" />
				<div className="h-6 w-24 bg-muted/20 rounded-lg" />
			</div>
		</div>
	);
}