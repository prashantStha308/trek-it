import { body, query } from 'express-validator';
import { mongoIdParam } from './validation.helpers.js';

export const validateReviewBody = [
    body('title').notEmpty().withMessage('title is required').bail().trim().escape(),
    body('description').notEmpty().withMessage('description is required').bail().trim(),
    body('rating').notEmpty().withMessage("rating is required").bail().isFloat({ min: 0, max: 5 }).withMessage('rating must be between 0 and 5'),
];

export const validateReviewQuery = [
    query('rating').optional().isFloat({ min: 0, max: 5 }),
    query('sort').optional().isIn(['rating', '-rating', 'createdAt', '-createdAt']),
];

export const validateReviewParams = mongoIdParam('reviewId');