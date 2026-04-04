import express from "express";
import {bufferUpload} from "../../config/multer.config.js";
import {authorize} from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import {
    validateReviewBody,
    validateReviewBodyPatch,
    validateReviewQuery,
    validateReviewParams,
} from "../../middlewares/validation/index.js";
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from "./reviews.controller.js";

// api/review
const reviewR = express.Router();

reviewR.post('/', authorize(['tourist', 'admin']), validateReviewBody, validate, bufferUpload.array('chatImage', 10), createReview);

reviewR.get('/', validateReviewQuery, validate, getAllReviews);

reviewR.delete('/:reviewId', authorize(['tourist', 'admin']), validateReviewParams, validate, deleteReview);

reviewR.patch('/:reviewId', authorize(['tourist']), validateReviewParams, validateReviewBodyPatch, validate, updateReview)

// Dynamic
reviewR.get('/:reviewId', validateReviewParams, validate, getReviewById);


export {reviewR};