import express from "express";
import {bufferUpload} from "../../config/multer.config.js";

import {authorize} from "../../middlewares/authorize.js";
import { parseFormFields } from "../../middlewares/body.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
    validateReviewBody,
    validateReviewBodyPatch,
    validateReviewQuery,
    validateReviewParams,

    validatePackageParams,
} from "../../middlewares/validation/index.js";
import {
    createReview,

    getAllReviews,
    getUserReviews,
    getReviewById,
    getRatingAverage,

    updateReview,
    deleteReview
} from "./reviews.controller.js";


// api/review
const reviewR = express.Router();

reviewR.post('/', authorize(['tourist', 'guide']),
    bufferUpload.array('images', 10),
    // parseFormFields("ratings"),
    validateReviewBody, validate,
    createReview
);

reviewR.get('/', validateReviewQuery, validate, getAllReviews);
reviewR.get('/me', authorize(['tourist']), validateReviewQuery, validate, getUserReviews);
reviewR.get('/avg', validateReviewQuery, validate, getRatingAverage);

reviewR.delete('/:reviewId', authorize(['tourist', 'guide', 'admin']), validateReviewParams, validate, deleteReview);

reviewR.patch('/:reviewId', authorize(['tourist']), validateReviewParams, validateReviewBodyPatch, validate, updateReview)

// Dynamic
reviewR.get('/:reviewId', validateReviewParams, validate, getReviewById);


export {reviewR};