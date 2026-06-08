// THis was built to make uslBuilder able to also parse arrays to query parameters
export const toQueryString = (query = {})=>{
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value])=>{
        if(Array.isArray(value)){
            value.forEach(val => params.append(key, val));
        }
        else if(value !== undefined && value !== null && value !== ""){
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
        GET_ALL: (query) => resolveRoute('/user', null, query),
        GET: (id) => resolveRoute('/user', id),
        ME: "/user/me",
        BASE: "/user"
	},
	
	GUIDE: {
		GET_ALL: (query) => resolveRoute("/guide", null, query),
		GET: (id) => resolveRoute("/guide", id),
        SEARCH: (query) => resolveRoute("/guide/search", null, query),
        BASE: "/guide"
	},

    PACKAGE: {
        GET_ALL: (query) => resolveRoute('/package', null, query),
        GET: (id) => resolveRoute('/package', id),
        GET_GUIDE_PACKAGES: (guideId, query) => resolveRoute( "/package/guide", guideId, query ),
        GET_COLLABORATORS: (pkgId) => resolveRoute('/package/collaborators', pkgId),
        CREATE: "/package",
        UPDATE: (id) => resolveRoute('/package', id),
        DELETE: (id) => resolveRoute('/package', id),
        SEARCH: (query)=> resolveRoute('/package/search', null, query),
        BASE: "/package"
	},
	
    BOOKING: {
        GET_ALL: (query) => resolveRoute('/booking', null, query),
        GET: (id) => resolveRoute('/booking', id),
        GET_ACTIVE: (query) =>  resolveRoute('/booking/active', null, query),
        CREATE: "/booking",
        UPDATE: (id, query) => resolveRoute('/booking', id, query),
        CANCEL: (id) => resolveRoute("/booking/cancel", id),
        BASE: "/booking"
	},
	
    PAYMENT: {
        INITIATE: "/payment/initiate",
        VERIFY: "/payment/verify",
        REFUND: (id) => resolveRoute('/payment/refund', id),
        HISTORY: (query) => resolveRoute('/payment', null, query),
        BASE: "/payment"
	},
	
    REVIEW: {
        GET_ALL: (query) => resolveRoute('/review', null, query),
        GET: (id) => resolveRoute('/review', id),
        CREATE: "/review",
        UPDATE: (id) => resolveRoute('/review', id),
        DELETE: (id) => resolveRoute('/review', id),
        BASE: "/review"
	},
	
    NOTIFICATION: {
        GET_ALL: (query) => resolveRoute('/notification', null, query),
      // TODO: implement this in backend later
        MARK_READ: (id) => resolveRoute("/notification/read", id),
        MARK_ALL_READ: "/notification/read-all",
        BASE: "/notification"
    },
    CHAT: {
        GET_ALL: (query) => resolveRoute('/chat', null, query),
        GET: (id) => resolveRoute('/chat', id),
        GET_MESSAGES: (chatId, query)=> resolveRoute('/chat/messages', chatId, query),
        GET_OR_CREATE: '/chat/direct',
    },
    META:{
        REGIONS: (query) => resolveRoute("/meta/regions", null, query),
        ACTIVITIES:(query) => resolveRoute("meta/activities", null, query),
        SPECIALITIES: (query) => resolveRoute("meta/specialities", null, query),
    }
}

export default API_ROUTES;