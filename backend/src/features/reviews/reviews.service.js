import mongoose from "mongoose";
// Models
import {
    Review,
    Booking
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
    // validateObject(body, ["title", "content", "rating"]);
    
    // if ( (!body.guide && !body.package) || (body.guide && body.package) ) {
    //     throw new ApiError(400, "review body must any and only one of ['guide', 'package'].");
    // }
    // const query = body.guide ? {guideId: body.guide} : {packageId: body.package}
    // await checkValidBooking(reviewer, query);

    const [booking, review] = await Promise.all(
        [Booking.findOne({ _id: body.booking, tourist: reviewer, status: 'completed' }),
        Review.findOne({ reviewer, booking: body.booking, })]
    );

    if (!booking) {
        throw new ApiError(400, "User is not eligible to post a review. Tourist not found in booking's user list")
    }

    if (review) {
        throw new ApiError(400, "Cannot create duplicate review");
    }
    
    let images = [];
    if (files?.length) {
        images = await uploadImages(files);
    }

    const newReview = await Review.create({
        reviewer,
        ...body,
        images
    });

    return newReview;
}

export const updateReviewService = async (body, reviewId) => {
    // validateObject(body, ["title", "content", "rating"], {isUpdate: true});

    const review = await Review.findByIdAndUpdate(
        reviewId,
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