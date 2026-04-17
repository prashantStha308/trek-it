import {
    User,
    Booking,
    Package,
    Payment
} from "../../models/index.js";
import {
    GRACE_PERIOD_DAYS,
    MAX_CANCELLATION_FEE,
    INITIAL_CANCELLATION_FEE,
    FEE_INCREMENT,
    FEE_INCREMENT_INTERVAL_DAYS,
} from "../../constants/constants.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";


export const getCancellationFee = async( totalPrice, startingDay, cancellationDate ) => {
    /*
        1. Take total price
        2. Get trek starting date and cancellation date
        3. Based on the days difference of cancellation date, apply cancellation fees(reference in booking.constants.js) on the total price
        4. return the obtained price.
    */
}

export const initPayment = async () => {
    /**
     * 
     */
}

export const savePaymentService = async (paymentId, payload) => {
    //reine this later 

    const payment = await Payment.create({
        amount: payload.amount,
        booking: payload.bookingId,
        status: payload.status,
        transactionId: paymentId,
        paidBy: payload.paidBy,
        paidTo: payload.paidTo,
        method: payload.method
    });
}


export const getUserPaymentStatService = async (userId, role = "tourist", limit = 10, page = 1) => {
    const paymentDirectionField = role === "tourist" ? "paidBy" : "paidTo";
    
    const payments = await getAll(Payment, {
        filter: { [paymentDirectionField]: userId },
        populate: {
            path: "booking",
            select: "package customRequest status date groupSize totalPrice"
        },
        limit, page
    });

    const totalPaid = payments.reduce((acc, payment) => {
        return acc + payment.amount
    }, 0);

    return {payments, totalPaid};
}