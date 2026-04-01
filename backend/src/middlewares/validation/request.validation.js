import { body } from 'express-validator';
import { mongoIdParam } from './validation.helpers.js';

export const validateCustomRequestBody = [
    body('description').notEmpty().withMessage('description is required').bail().trim(),
    body('guide').isMongoId().withMessage('guide must be a valid MongoDB ObjectId'),
];

export const validateCollabRequestBody = [
    body('description').notEmpty().withMessage('description is required').bail().trim(),
    body('guide').isMongoId().withMessage('guide must be a valid MongoDB ObjectId'),
    body('package').isMongoId().withMessage('package must be a valid MongoDB ObjectId'),
];

export const validateCustomRequestParams = mongoIdParam('requestId');
export const validateCollabRequestParams = mongoIdParam('requestId');