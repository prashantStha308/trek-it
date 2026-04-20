export const urlBuilder = (base, query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    if (!queryString) return base;
    return `${base}?${queryString}`;
};

const resolveRoute = (base, id, query) => {
    const url = id ? `${base}/${id}` : base;
    return urlBuilder(url, query);
};

const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER_GUIDE: "/auth/guide",
        REGISTER_TOURIST: "/auth/tourist",
        ME: "/auth/me",
        LOGOUT: "/auth/logout",
	},
	
    USER: {
        GET_ALL: (query) => resolveRoute('/users', null, query),
        GET: (id) => resolveRoute('/users', id),
        BASE: "/users"
	},
	
	GUIDE: {
		GET_ALL: (query) => resolveRoute("guides", null, query),
		GET: (id) => resolveRoute("/guide", id),
	},

    PACKAGE: {
        GET_ALL: (query) => resolveRoute('/packages', null, query),
        GET: (id) => resolveRoute('/packages', id),
        CREATE: "/packages",
        UPDATE: (id) => resolveRoute('/packages', id),
        DELETE: (id) => resolveRoute('/packages', id),
        BASE: "/packages"
	},
	
    BOOKING: {
        GET_ALL: (query) => resolveRoute('/bookings', null, query),
        GET: (id) => resolveRoute('/bookings', id),
        CREATE: "/bookings",
        UPDATE: (id, query) => resolveRoute('/bookings', id, query),
        CANCEL: (id) => resolveRoute("/bookings/cancel", id),
        BASE: "/bookings"
	},
	
    PAYMENT: {
        INITIATE: "/payments/initiate",
        VERIFY: "/payments/verify",
        REFUND: (id) => resolveRoute('/payments/refund', id),
        HISTORY: (query) => resolveRoute('/payments', null, query),
        BASE: "/payments"
	},
	
    REVIEW: {
        GET_ALL: (query) => resolveRoute('/reviews', null, query),
        GET: (id) => resolveRoute('/reviews', id),
        CREATE: "/reviews",
        UPDATE: (id) => resolveRoute('/reviews', id),
        DELETE: (id) => resolveRoute('/reviews', id),
        BASE: "/reviews"
	},
	
    NOTIFICATION: {
        GET_ALL: (query) => resolveRoute('/notifications', null, query),
      // TODO: implement this in backend later
        MARK_READ: (id) => resolveRoute("/notifications/read", id),
        MARK_ALL_READ: "/notifications/read-all",
        BASE: "/notifications"
    },
    CHAT: {
        GET_ALL: (query) => resolveRoute('/chat', null, query),
        GET: (id) => resolveRoute('/chat', id),
    }
}

export default API_ROUTES;