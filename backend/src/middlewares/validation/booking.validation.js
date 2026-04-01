import { body, query } from 'express-validator';
import { BOOKING_TYPES, BOOKING_STATUSES } from './constants.validation.js';
import { mongoIdParam } from './validation.helpers.js';

export const validateBookingBody = [
    body('tourist').isMongoId().withMessage("tourist must be a valid MongoDB ObjectId"),
    body('guide').isMongoId().withMessage("tourist must be a valid MongoDB ObjectId"),
    body('customRequest').optional().isMongoId().withMessage("customRequest must be a valid MongoDB ObjectId"),
    body('package').isMongoId().withMessage('package must be a valid MongoDB ObjectId'),
    body('type').isIn(BOOKING_TYPES).withMessage(`type must be one of: ${BOOKING_TYPES.join(', ')}`),
    body('date').isISO8601().withMessage('date must be a valid date'),
    body('groupSize').isInt({ min: 1 }).withMessage('groupSize must be at least 1'),
    body('customRequest').optional().isMongoId().withMessage('customRequest must be a valid MongoDB ObjectId'),
];

export const validateBookingStatusBody = [
    body('status').isIn(BOOKING_STATUSES).withMessage(`status must be one of: ${BOOKING_STATUSES.join(', ')}`),
];

export const validateBookingQuery = [
    query('status').optional().isIn(BOOKING_STATUSES),
    query('type').optional().isIn(BOOKING_TYPES),
];

export const validateBookingParams = mongoIdParam('bookingId');