import { body, query } from 'express-validator';
import { ROLES, GENDERS } from '../../constants/user.constant.js';
import { trimEscapeOptional, mongoIdParam } from './validation.helpers.js';

export const validateUserBody = [
    body('name').trim().escape().isLength({ min: 2, max: 50 }),
    body('email').isEmail().withMessage("Invalid Email").bail().normalizeEmail(),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Password must contain uppercase, lowercase, number and symbol'),
    body('role').notEmpty().isIn(ROLES).withMessage(`role must be one of: ${ROLES.join(', ')}`),
    body('gender').isIn(GENDERS).withMessage(`gender must be one of: ${GENDERS.join(', ')}`),
    body('age').isInt({ min: 18, max: 80 }).withMessage('age must be between 18 and 80'),
    body('languages').optional().isArray(),
    body('languages.*').trim().escape(),
    body('address.country').trim().escape().notEmpty(),
    body('address.state').optional().trim().escape(),
];

export const validateLoginBody = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().withMessage('password is required'),
];

export const validateGuideBody = [
    ...validateUserBody,
    body('regions').isArray({ min: 1 }).withMessage('At least one region is required'),
    body('regions.*').trim().escape(),
    body('specialities').optional().isArray(),
    body('specialities.*').trim().escape(),
];

export const validateTouristBody = [
    ...validateUserBody,
    body('interests').optional().isArray(),
    body('interests.*').trim().escape(),
    body('preferredLanguages').optional().isArray(),
    body('preferredLanguages.*').trim().escape(),
];

export const validateBasicQuery = [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 40 }).toInt(),
    // query('name').optional().trim().escape(),
];

export const validateUserQuery = [
    ...validateBasicQuery,
    ...trimEscapeOptional('country', 'state', 'sort'),
    query('role').optional().isIn(ROLES),
    query('gender').optional().isIn(GENDERS),
    query('language').optional().trim().escape(),
    query('age').optional().isInt({ min: 18, max: 80 }),
];

export const validateUserParams = mongoIdParam('userId');
export const validateGuideParams = mongoIdParam('guideId');
