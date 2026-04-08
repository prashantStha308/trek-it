import { body, query } from 'express-validator';
import { PACKAGE_TYPES } from '../../constants/package.constant.js';
import { trimEscapeOptional, mongoIdParam } from './validation.helpers.js';

export const validatePackageBody = [
    body('name').notEmpty().withMessage('name is required').trim().escape(),
    body('description').notEmpty().withMessage('description is required').trim(),
    body('type').isIn(PACKAGE_TYPES).withMessage(`type must be one of: ${PACKAGE_TYPES.join(', ')}`),
    body('startingPrice').isFloat({ min: 10 }).withMessage('startingPrice must be at least 10'),
    body('maxGroupSize').optional().isInt({ min: 1 }),
    body('daysAlloted').isInt({ min: 1 }).withMessage('daysAlloted must be at least 1'),
    body('keywords').isArray({ min: 1 }).withMessage('At least one keyword is required'),
    body('keywords.*').trim().escape(),
    body('regions').isArray({ min: 1 }).withMessage('At least one region is required'),
    body('regions.*').trim().escape(),
    body('activities').isArray({ min: 1 }).withMessage('At least one activity is required'),
    body('activities.*').trim().escape(),
    body('requiresPermit').optional().isBoolean(),
    body('dates').optional().isArray(),
    body('dates.*.date').isISO8601().withMessage('dates.*.date must be a valid date'),
    body('dates.*.spotsTotal').isInt({ min: 1 }),
    body('dates.*.spotsLeft').isInt({ min: 0 }),
];

export const validatePackageQuery = [
    ...trimEscapeOptional('region', 'activity', 'keyword', 'sort'),
    query('type').optional().isIn(PACKAGE_TYPES),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('days').optional().isInt({ min: 1 }),
];

export const validatePackageParams = mongoIdParam('packageId');