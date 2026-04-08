export const NOTIFICATION_TITLE = Object.freeze({
    bookingCreated: "Your Booking has been created successfully",
    newBookingRequest: "You have a new booking request",
    bookingRejected: "Your booking request has been rejected",
    bookingConfirmed: "Your Booking is Confirmed",
    bookingCancelled: "Your Booking has been cancelled",
    bookingCompleted: "Your Tour has been completed",

    packageVerified: "Your Package has been verified and now visible to everyone",
    packageVerification_failed: "Your package did not fulfill all requirements to be verified",
    packageDeleted: "One of your package has been deleted.",

    reviewReceived: "You have received a new review",
    messageReceived: "New unread messages",

    paymentReceived: "Your payment has been successfully retrived",
    paymentRefunded: "Your payment has been successfully refunded",
});

export const NOTIFICATION_EVENTS = Object.freeze(
    Object.keys(NOTIFICATION_TITLE).reduce((acc, key) => {
        acc[key] = key;
        return acc;
    }, {})
);

export const NOTIFICATION_CLIENT_EVENT = Object.freeze({
    notificationRead: "notification:markRead",
    notificationReadAll: "notification:markReadAll",
})