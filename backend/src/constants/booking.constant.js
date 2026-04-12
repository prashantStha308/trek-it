export const BOOKING_STATUS_ENUM = Object.freeze({
    pending: "pending",
    accepted: "accepted",
    rejected: "rejected",
    paid: "paid",
    cancelled: "cancelled",
    completed: "completed",
})
export const BOOKING_STATUS = Object.values(BOOKING_STATUS_ENUM);

// 15% commission
export const TREKIT_COMMISSION = 0.15;