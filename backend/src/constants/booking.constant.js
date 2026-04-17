export const BOOKING_STATUS_ENUM = Object.freeze({
    // initial state
    pending: "pending",
    // guide has accepted the booking
    guide_accepted: "guide_accepted",
    // booking has been rejected
    rejected: "rejected",
    // only for Custom requests.
    awaiting_tourist_confirmation: "awaiting_tourist_confirmation",
    // Guide failed to respond. Or if its' a custom request, either of the party failed to respond in time
    expired: "expired",
    // booking is confiremed, not paied for yet
    confirmed: "confirmed",
    // booking has been paied
    paid: "paid",
    // booking is active, meaning the tour is actively happening right now
    active: "active",
    // The tour is completed
    completed: "completed",

    // The booking was cancelled
    cancelled: "cancelled",
});
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

export const ACCEPTANCE_PERIOD_HOUR = 72;