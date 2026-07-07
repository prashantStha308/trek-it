export default function GuideAvailabilityBadge({ guide }) {
  if (guide?.isAvailable === undefined) return null;

  return (
    <span
      className={`text-xs font-medium w-fit px-2 py-0.5 rounded-full ${
        guide.isAvailable
          ? "bg-primary/15 text-primary"
          : "bg-red-500/15 text-red-500"
      }`}
    >
      {guide.isAvailable ? "Available for booking" : "Currently unavailable"}
    </span>
  );
}