import { Review } from "../../models/index.js";
import {
    createReviewService,
    updateReviewService,
    deleteReviewService
} from "./reviews.service.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";



export const createReview = async (req, res) => {
    const user = req.user;
    const review = await createReviewService(req.body, user._id, req.files);

    return ApiResponse.success(res, {
        status: 201,
        data: review,
        message: "Review written successfully"
    } );
}

export const getAllReviews = async (req, res) => {
	let {limit, page, ...filter} = req.query;

    const reviews = await getAll(Review, {
        limit, page,
        filter,
    });

    return ApiResponse.success(res, {
        data: reviews,
        message: "Reviews retrived successfully"
    });
}

export const getReviewById = async (req, res) => {
    const review = await getById(Review, req.params.reviewId);

    return ApiResponse.success(res, {
        data: review,
        message: "Retrived review successfully"
    });
}

export const updateReview = async (req, res) => {
    const review = await updateReviewService(req.body, req.params.reviewId);

    return ApiResponse.success(res, {
        message: "Review updated successfully",
        data: review
    });
}

export const deleteReview = async (req, res) => {
    const deletedReview = await deleteReviewService(req.params.reviewId, req.user._id);

    return ApiResponse.success(res, {
        data: deletedReview._id,
        message: "Deleted review successfully"
    });
}