import { body, query } from 'express-validator';
import { PACKAGE_TYPES } from '../../constants/package.constant.js';
import { trimEscapeOptional, mongoIdParam } from './validation.helpers.js';

export const validatePackageBody = [
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('description').notEmpty().withMessage('Description is required').trim(),
    
    body('keywords').isArray({ min: 1 }).withMessage('At least one keyword is required'),
    body('keywords.*').trim().escape(),
    
    body('activities').isArray({ min: 1 }).withMessage('At least one activity is required'),
    body('activities.*').trim().escape(),
    
    body('minGroupSize').isInt({ min: 1 }).withMessage('Min group size must be at least 1'),
    body('maxGroupSize')
        .isInt({ min: 1, max: 50 }).withMessage('Max group size must be between 1 and 50')
        .custom((value, { req }) => {
            if (Number(value) < Number(req.body.minGroupSize)) {
                throw new Error('Max group size cannot be less than min group size');
            }
            return true;
        }),
    
    body('pricePerPerson')
        .isInt({ min: 1, max: 9999 }).withMessage('Price per person must be between 1 and 9999'),
    body('daysAlloted')
        .isInt({ min: 1, max: 32 }).withMessage('Duration must be between 1 and 32 days'),
    
    body('requiresPermit').optional().isBoolean(),
    body('permitDetails').optional().trim(),
    
    body('stops').isArray({ min: 1 }).withMessage('At least one stop is required'),
    body('stops.*.day').isInt({ min: 1 }).withMessage('Stop day must be at least 1'),
    body('stops.*.type').notEmpty().trim(),
    
    body('stops.*.customType').optional().trim(),
    body('stops.*.landmark').optional().trim(),

    body('stops.*.nearestCity').notEmpty().withMessage('Nearest city is required for each stop'),
    body('stops.*.nearestCity.name').notEmpty().withMessage('City name is required').trim(),
    body('stops.*.nearestCity.lat').isFloat().withMessage('City latitude is required'),
    body('stops.*.nearestCity.long').isFloat().withMessage('City longitude is required'),
    
];

export const validateCustomPackageMeta = [
    body('tourist').optional().isMongoId().withMessage('tourist must be a valid MongoDB ObjectId'),
    body('customRequest').optional().isMongoId().withMessage('customRequest must be a valid MongoDB ObjectId'),
];

export const validatePackageQuery = [
    ...trimEscapeOptional('region', 'activity', 'keyword', 'sort'),
    query('type').optional().isIn(PACKAGE_TYPES),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('days').optional().isInt({ min: 1 }),
];

export const validatePackageParams = mongoIdParam('packageId');