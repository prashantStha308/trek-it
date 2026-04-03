import mongoose from "mongoose";
// Models
import {
    Review,
} from "../../models/index.js";
// utils and helpers
import {
    validateObject,
    checkValidBooking,
} from "../../utils/request.helper.js";
import {
    uploadImages
} from "../../utils/cloudinary.services.js";
import ApiError from "../../utils/ApiError.js";


export const createReviewService = async (body, reviewer, files) => {
    validateObject(body, ["title", "content", "rating"]);
    
    if ( (!body.guide && !body.package) || (body.guide && body.package) ) {
        throw new ApiError(400, "review body must any and only one of ['guide', 'package'].");
    }
    const query = body.guide ? {guideId: body.guide} : {packageId: body.package}
    await checkValidBooking(reviewer, query);
    
    let images = [];
    if (files?.length) {
        images = await uploadImages(files);
    }

    const review = await Review.create({
        reviewer,
        ...body,
        images
    });

    return review;
}

export const updateReviewService = async (body, reviewId) => {
    validateObject(body, ["title", "content", "rating"], {isUpdate: true});

    const review = await Review.findByIdAndUpdate(
        new reviewId,
        { $set: body },
        { new: true, runValidators: true }
    ).lean();

    if (!review) throw new ApiError(404, "Review not found");

    return review;
}

export const deleteReviewService = async (reviewId, userId) => {
    // TODO: validate ownership

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
}