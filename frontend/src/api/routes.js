// THis was built to make uslBuilder able to also parse arrays to query parameters
export const toQueryString = (query = {})=>{
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value])=>{
        if(Array.isArray(value)){
            value.forEach(val => params.append(key, val));
        }else if(value !== undefined && value !== null && value !== ""){
            params.append(key, value)
        }
    })

    return params.toString();
}

export const urlBuilder = (base, query = {}) => {
    const queryString = toQueryString(query);
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
        REGISTER_TOURIST: "/auth/",
        LOGOUT: "/auth/logout",
	},
	
    USER: {
        GET_ALL: (query) => resolveRoute('/users', null, query),
        GET: (id) => resolveRoute('/users', id),
        ME: "/users/me",
        BASE: "/users"
	},
	
	GUIDE: {
		GET_ALL: (query) => resolveRoute("/guides", null, query),
		GET: (id) => resolveRoute("/guides", id),
        SEARCH: (query) => resolveRoute("/guides/search", null, query),
        BASE: "/guides"
	},

    PACKAGE: {
        GET_ALL: (query) => resolveRoute('/packages', null, query),
        GET: (id) => resolveRoute('/packages', id),
        CREATE: "/packages",
        UPDATE: (id) => resolveRoute('/packages', id),
        DELETE: (id) => resolveRoute('/packages', id),
        SEARCH: (query)=> resolveRoute('/packages/search', null, query),
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
    },
    META:{
        REGIONS: (query) => resolveRoute("/meta/regions", null, query),
        ACTIVITIES:(query) => resolveRoute("meta/activities", null, query),
        SPECIALITIES: (query) => resolveRoute("meta/specialities", null, query),
    }
}

export default API_ROUTES;