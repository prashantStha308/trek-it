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
} from "./bookings.controller.js";


const bookingR = express.Router();

bookingR.get('/', validateBookingQuery, validate, authorize, getAllBooking);
bookingR.get('/:bookingId', validateBookingParams, validateBookingQuery, validate, authorize, getBookingById);

bookingR.post('/', validateBookingBody, validate, authorize(['admin']), createBooking);

bookingR.patch('/:bookingId', validateBookingParams, validateBookingStatusBody, validateBookingQuery, validate, authorize(['admin']), setBookingStatus);

export {bookingR};