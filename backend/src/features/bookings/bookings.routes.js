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
    getActiveBookings,
    getBookingById,
    createBooking,
    setBookingStatus,
    cancelBooking,
    deleteBooking,
} from "./bookings.controller.js";


const bookingR = express.Router();

bookingR.get('/', validateBookingQuery, validate, authorize(["tourist"]), getAllBooking);
bookingR.get('/active', validateBookingQuery, validate, authorize(), getActiveBookings);

// create booking
bookingR.post('/', validateBookingBody, validate, authorize(["admin", "tourist", "guide"]), createBooking);

// dynamic routes
bookingR.get('/:bookingId', validateBookingParams, validateBookingQuery, validate, authorize(), getBookingById);

// cancle booking
bookingR.patch('/cancel/:bookingId', (req,res, next)=> {console.log("cancelling"); next();} , validateBookingParams, validate, authorize(), cancelBooking);

// update booking status
bookingR.patch('/status/:bookingId', validateBookingParams, validateBookingStatusBody, validate, authorize(['guide', 'admin']), setBookingStatus);

// Delete booking
bookingR.delete('/:bookingId', validateBookingParams, validate, authorize(["admin"]), deleteBooking);


export {bookingR};