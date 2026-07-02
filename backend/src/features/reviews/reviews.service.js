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

    const {
        comment, rating, packageId, guideId
    } = body;

    /* This was when booking ref was used instead of package and guide refs */
    // const [booking, review] = await Promise.all(
    //     [Booking.findOne({ _id: body.booking, tourist: reviewer, status: 'completed' }),
    //     Review.findOne({ reviewer, booking: body.booking, })]
    // );

    // if (!booking) {
    //     throw new ApiError(400, "User is not eligible to post a review. Tourist not found in booking's user list")
    // }

    const target = packageId
        ? { package: packageId }
        : { guide: guideId };

    const review = await Review.findOne({
        reviewer,
        ...target
    });

    if (review) {
        throw new ApiError(400, "Cannot create duplicate review");
    }
    
    let images = [{ src: "", publicId: "" }];
    if (files?.length) {
        images = await uploadImages(files);
    }

    const input = {
        reviewer,
        comment,
        rating,
        ...target,
        images
    }

    console.log(input);

    const newReview = await Review.create(input);

    return newReview;
}


export const getRatingAverageService = async(query) => {
    const {guideId, packageId} = query;

    const target = packageId
        ? { package: packageId }
        : { guide: guideId };


    const [stats] = await Review.aggregate([
        {
            $match: target
        },
        {
            $group: {
                _id: null,
                avgServices: { $avg: "$ratings.services" },
                avgInteractivity: { $avg: "$ratings.interactivity" },
                avgActivities: { $avg: "$ratings.activities" },
                totalReviews: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                avgServices: 1,
                avgInteractivity: 1,
                avgActivities: 1,
                totalReviews: 1,
                overallAverage: {
                    $avg: [
                        "$avgServices",
                        "$avgInteractivity",
                        "$avgActivities"
                    ]
                }
            }
        }
    ]);


    return stats ?? {
        avgServices: 0,
        avgInteractivity: 0,
        avgActivities: 0,
        overallAverage: 0,
        totalReviews: 0
    };
}


export const updateReviewService = async (body, reviewId) => {
    // validateObject(body, ["title", "comment", "rating"], {isUpdate: true});

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