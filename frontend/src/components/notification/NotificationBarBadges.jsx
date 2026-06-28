import useNotificationStore from "@/store/notification/notification.store.js";

import {Pill} from "@/components/explore/FilterPanel";
import {Button} from "@/components/ui/Button";


export default function NotificationBarBadges({ notificationType, setNotificationType }) {
    
    const {markAllRead} = useNotificationStore.getState();

    const badges = [
	    { label: "all", value: null },
	    { label: "unread", value: false },
	    { label: "read", value: true }
	];

    return (
        <section className="w-full flex justify-between items-center" >
            <div className="py-2 flex gap-2">
                {badges.map((badge) => (
                    <Pill
                        key={badge.label}
                        label={badge.label}
                        active={notificationType === badge.value}
                        onClick={() => setNotificationType(badge.value)}
                    />
                ))}
            </div>

                <Button 
                    size="md"
                    className="w-fit"
                    onClick={markAllRead}
                >
                    Mark all read
                </Button>

        </section>
    );
}
