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

// Cancellation constants
// Cancellation grace period
/**
 * @description - Grace period before the esteemed date.
 */
export const GRACE_PERIOD_DAYS = 14;

// Cancellation fees
export const MAX_CANCELLATION_FEE = 0.15;
export const INITIAL_CANCELLATION_FEE = 0.05;
export const FEE_INCREMENT = 0.02;
export const FEE_INCREMENT_INTERVAL_DAYS = 1;