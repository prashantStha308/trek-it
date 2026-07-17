import { Review } from "../../models/index.js";
import {
    createReviewService,
    getRatingAverageService,
    updateReviewService,
    deleteReviewService
} from "./reviews.service.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

// populate constants to populate review metadatas
const POPULATE =[
    {
        path: "reviewer",
        select: "name age gender role profilePicture"
    },
    {
        path: "guide",
        select: "name age gender role aboutMe isVerified isAvailable isTrusted rating profilePicture"
    },
    {
        path: "package",
        select: "name description thumbnail"
    }
]


// post a review
export const createReview = async (req, res) => {
    const user = req.user;
    const review = await createReviewService(req.body, user._id, req.files);

    return ApiResponse.success(res, {
        status: 201,
        data: review,
        message: "Review written successfully"
    } );
}

// Get all the reviews posted by the logged in user
export const getUserReviews = async (req, res) => {
	const user = req.user;

    let {limit, page, ...filter} = req.query;

    const reviews = await getAll(Review, {
        limit, page,
        filter:{
            reviewer: user._id,
        },
        populate: POPULATE
    });

    return ApiResponse.success(res, {
        data: reviews,
        message: "Reviews retrived successfully"
    });
}

// Get All reviews, this func is to be used with a query
export const getAllReviews = async(req, res) => {
    let {limit, page, sort = {rating: -1}, ...filter} = req.query;

    const reviews = await getAll(Review, {
        limit, page,
        filter,
        sort,
        populate: POPULATE
    });


    return ApiResponse.success(res, {
        data: reviews,
        message: "Reviews retrived successfully"
    });
}


// Get ONE review By its ID
export const getReviewById = async (req, res) => {
    const review = await getById(Review, req.params.reviewId,{
        populate: POPULATE
    });

    return ApiResponse.success(res, {
        data: review,
        message: "Retrived review successfully"
    });
}


// Gets the average ratings on all fields as well as an total average
export const getRatingAverage = async(req, res) => {
    const stats = await getRatingAverageService(req.query);
    
    return ApiResponse.success(res, {
        data: stats,
        message: "Retrived stats successfully"
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