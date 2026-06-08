import {Pill} from "@/components/explore/FilterPanel";


export default function NotificationBarBadges({ notificationType, setNotificationType }) {
	const badges = [
	    { label: "all", value: null },
	    { label: "unread", value: false },
	    { label: "read", value: true }
	];

    return (
        <section className="w-full py-2 flex gap-2">
            {badges.map((badge) => (
                <Pill
                    key={badge.label}
                    label={badge.label}
                    active={notificationType === badge.value}
                    onClick={() => setNotificationType(badge.value)}
                />
            ))}
        </section>
    );
}
