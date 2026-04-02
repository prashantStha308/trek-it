import { body, query } from 'express-validator';
import { mongoIdParam } from './validation.helpers.js';

export const validateReviewBody = [
    body('guide').optional().isMongoId().withMessage("reviewBody.package should be a valid MongoDb ObjectId"),
    body('package').optional().isMongoId().withMessage("reviewBody.package should be a valid MongoDb ObjectId"),
    body('title').notEmpty().withMessage('reviewBody.title is required').bail().trim().escape(),
    body('content').notEmpty().withMessage('reviewBody.content is required').bail().trim(),
    body('rating').notEmpty().withMessage("reviewBody.rating is required").bail().isFloat({ min: 0, max: 5 }).withMessage('reviewBody.rating must be between 0 and 5'),
];

export const validateReviewQuery = [
    query('rating').optional().isFloat({ min: 0, max: 5 }),
    query('sort').optional().isIn(['rating', '-rating', 'createdAt', '-createdAt']),
];

export const validateReviewParams = mongoIdParam('reviewId');