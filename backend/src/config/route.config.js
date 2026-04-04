import { authR } from "../features/auth/auth.routes.js";
import { usersR } from "../features/users/users.routes.js";
import { packageR } from "../features/packages/package.routes.js";
import { reviewsR } from "../features/reviews/reviews.routes.js";
import { chatR } from "../features/chat/chat.routes.js";

export const routers = [
    { base: "/api/auth", router: authR },
    { base: "/api/users", router: usersR },
    { base: "/api/packages", router: packageR },
    { base: "/api/reviews", router: reviewsR },
    { base: "/api/chat", router: chatR },
];