import { authR } from "../features/auth/auth.routes.js";
import { userR } from "../features/users/users.routes.js";
import { packageR } from "../features/packages/package.routes.js";
import { reviewR } from "../features/reviews/reviews.routes.js";
import { chatR } from "../features/chat/chat.routes.js";
import { bookingR } from "../features/bookings/bookings.routes.js";
import { notificationR } from "../features/notifications/notifications.routes.js";
import { guidesR } from "../features/guides/guides.routes.js";
import { metaR } from "../features/meta/meta.routes.js"
import { collabRequestR } from "../features/collaboration/collaboration.routes.js";
import { customRequestR } from "../features/customRequests/customRequests.routes.js";

export const routers = [
    { base: "/api/auth", router: authR },
    { base: "/api/user", router: userR },
    { base: "/api/guide", router: guidesR },
    { base: "/api/package", router: packageR },
    { base: "/api/review", router: reviewR },
    { base: "/api/chat", router: chatR },
    { base: "/api/booking", router: bookingR },
    { base: "/api/notification", router: notificationR },
    { base: "/api/meta", router: metaR },
    { base: "/api/collaboration", router: collabRequestR },
    { base: "/api/custom-request", router: customRequestR },
];