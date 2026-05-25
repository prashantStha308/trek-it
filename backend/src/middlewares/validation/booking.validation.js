import { body, query } from 'express-validator';
import { PACKAGE_TYPES, BOOKING_STATUS } from '../../constants/constants.js';
import { mongoIdParam } from './validation.helpers.js';

export const validateBookingBody = [
    body('packageId').isMongoId().withMessage('packageId must be a valid MongoDB ObjectId'),
    body('date').isISO8601().withMessage('date must be a valid date'),
    body('groupSize').isInt({ min: 1 }).withMessage('groupSize must be at least 1'),
    body('customRequest').optional().isMongoId().withMessage('customRequest must be a valid MongoDB ObjectId'),
    body('guideId').optional().isMongoId().withMessage('guideId must be a valid MongoDB ObjectId'),
];


export const validateBookingStatusBody = [
    body('status').notEmpty().withMessage(`status must be one of: ${BOOKING_STATUS.join(', ')}`).bail().isIn(BOOKING_STATUS).withMessage(`status must be one of: ${BOOKING_STATUS.join(', ')}`),
];

export const validateBookingQuery = [
    query('status').optional().isIn(BOOKING_STATUS).withMessage(`status must be one of: ${BOOKING_STATUS.join(', ')}`),
];

export const validateBookingParams = mongoIdParam('bookingId');