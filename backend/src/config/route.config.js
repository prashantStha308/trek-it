import { authR } from "../features/auth/auth.routes.js";
import { userR } from "../features/users/users.routes.js";
import { packageR } from "../features/packages/package.routes.js";
import { reviewR } from "../features/reviews/reviews.routes.js";
import { chatR } from "../features/chat/chat.routes.js";
import { bookingR } from "../features/bookings/bookings.routes.js";
import { notificationR } from "../features/notifications/notifications.routes.js";
import { guidesR } from "../features/guides/guides.routes.js";

export const routers = [
    { base: "/api/auth", router: authR },
    { base: "/api/users", router: userR },
    { base: "/api/guides", router: guidesR },
    { base: "/api/packages", router: packageR },
    { base: "/api/reviews", router: reviewR },
    { base: "/api/chat", router: chatR },
    { base: "/api/booking", router: bookingR },
    { base: "/api/notification", router: notificationR },
];