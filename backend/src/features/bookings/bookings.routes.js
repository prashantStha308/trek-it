import express from "express";

import {
    validateBookingBody,
    validateBookingQuery,
    validateBookingStatusBody,
    validateBookingParams,
} from "../../middlewares/validation/index.js";
import validate from "../../middlewares/validate.middleware.js";
import { authorize } from "../../middlewares/authorize.js";

import {
    getAllBooking,
    getBookingById,
    createBooking,
    setBookingStatus,
    cancelBooking,
    deleteBooking,
} from "./bookings.controller.js";


const bookingR = express.Router();

bookingR.get('/', validateBookingQuery, validate, authorize(), getAllBooking);
bookingR.get('/:bookingId', validateBookingParams, validateBookingQuery, validate, authorize(), getBookingById);

// create booking
bookingR.post('/', validateBookingBody, validate, authorize(["admin", "tourist"]), createBooking);

// update booking status
bookingR.patch('/cancle/:bookingId', validateBookingParams, validate, authorize(), setBookingStatus);
bookingR.patch('/status/:bookingId', validateBookingParams, validateBookingStatusBody, validate, authorize([ 'tourist', 'guide', 'admin']), cancelBooking);

// Delete booking
bookingR.delete('/:bookingId', validateBookingParams, validate, authorize(["admin"]), deleteBooking);


export {bookingR};