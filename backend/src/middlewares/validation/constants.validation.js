export const BOOKING_STATUS_ENUM = Object.freeze({
    pending: "pending",
    confirmed: "confirmed",
    cancelled: "cancelled",
    completed: "completed",
})
export const BOOKING_STATUS = Object.values(BOOKING_STATUS_ENUM);


export const PACKAGE_TYPE_ENUM = Object.freeze({
    regular: "regular",
    custom: "custom"
})
export const PACKAGE_TYPES = Object.values(PACKAGE_TYPE_ENUM);


export const ROLE_ENUM = Object.freeze({
    tourist: "tourist",
    guide: "guide",
    admin: "admin",
})
export const ROLES = Object.values(ROLE_ENUM);


export const GENDER_ENUM = Object.freeze({
    male: "male",
    female: "female",
    others: "others"
})
export const GENDERS = Object.values(GENDER_ENUM);


export const CHAT_TYPE_ENUM = Object.freeze({
    direct: "direct",
    group: "group",
})
export const CHAT_TYPES = Object.values(CHAT_TYPE_ENUM);