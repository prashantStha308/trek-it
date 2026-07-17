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
        comment, ratings, packageId, guideId
    } = body;

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
        rating: ratings,
        ...target,
        images
    }

    console.log(input);

    const newReview = await Review.create(input);

    return newReview;
}


export const getRatingAverageService = async (query) => {
    const { guideId, packageId } = query;

    if (!packageId && !guideId) {
        throw new Error("Either guideId or packageId is required");
    }

    const target = packageId
        ? { package: new mongoose.Types.ObjectId(packageId) }
        : { guide: new mongoose.Types.ObjectId(guideId) };

    const [stats] = await Review.aggregate([
        { $match: target },
        {
            $group: {
                _id: null,
                avgServices: { $avg: "$rating.services" },
                avgInteractivity: { $avg: "$rating.interactivity" },
                avgActivities: { $avg: "$rating.activities" },
                totalReviews: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                avgServices: { $round: ["$avgServices", 1] },
                avgInteractivity: { $round: ["$avgInteractivity", 1] },
                avgActivities: { $round: ["$avgActivities", 1] },
                totalReviews: 1,
                overallAverage: {
                    $round: [
                        { $avg: ["$avgServices", "$avgInteractivity", "$avgActivities"] },
                        1
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
};

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