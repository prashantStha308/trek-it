import { body, query } from 'express-validator';
import { mongoIdParam } from './validation.helpers.js';

const bodyRating = [
    body("ratings").isObject().withMessage("reviewBody.ratings should be an Object"),
    body("ratings.*").isInt({min:0, max:5}).withMessage("reviewBody.ratings.* should be an int(min:0, max:5)"),
]


export const validateReviewBody = [
    body('packageId').optional().isMongoId().withMessage("reviewBody.packageId should be a valid MongoDb ObjectId"),
    body('guideId').optional().isMongoId().withMessage("reviewBody.guideId should be a valid MongoDb ObjectId"),

    body('comment').notEmpty().withMessage('reviewBody.comment is required').bail().trim(),

    ...bodyRating,
];

export const validateReviewBodyPatch = [
    body('comment').optional().trim(),
    ...bodyRating,
];

export const validateReviewQuery = [
    query('ratings').optional().isInt({ min: 0, max: 5 }),
    query('sort').optional().isIn(['ratings', '-ratings', 'createdAt', '-createdAt']),

    query('package').optional().isMongoId().withMessage("pacakge must be an Mongodb ObjectID"),
    query('guide').optional().isMongoId().withMessage("pacakge must be an Mongodb ObjectID"),
];

export const validateReviewParams = mongoIdParam('reviewId');