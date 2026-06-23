import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

// Get all reviews of the logged in user
export const getAllUserReviews = async({ limit= 10, page= 1, ...filters }) => {
	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET_USER_ALL({ limit, page, filters }));

	return res.data.data;
}

// export const getReviewById = async(reviewId) => {
// 	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET(reviewId));

// 	return res.data.data;
// }

// Get all reviews of the target package
export const getPackageReviews = async(pkgId, {limit=10, page=1}) =>{
	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET_ALL( { limit, page, package:pkgId }));

	return res.data.data;
}

// Get all reviews of the target guide
export const getGuideReviews = async(guideId, {limit=10, page=1}) =>{
	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET_ALL( { limit, page, guideId:guideId }));

	return res.data.data;
}

// Get average reviews of the target guide
export const getGuideAvgReviews = async(guideId) =>{
	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET_AVG( { guideId:guideId }));

	return res.data.data;
}

// Get average reviews of the target package
export const getPackageAvgReviews = async(packageId) =>{
	const res = await axiosInstance.get(API_ROUTES.REVIEW.GET_AVG( { packageId:packageId }));

	console.log("Package stat: ",res)

	return res.data.data;
}

// Post a review
export const postReview = async(formData)=>{
	const res = await axiosInstance.post(API_ROUTES.REVIEW.CREATE, formData);

	return res.data.data;
}

export const updateReview = async(reviewId, updatedBody) => {
	const res = await axiosInstance.patch(API_ROUTES.REVIEW.UPDATE(reviewId), updatedBody);

	return res.data.data;
}

export const deleteReview = async(reviewId) => {
	const res = await axiosInstance.delete(API_ROUTES.REVIEW.DELETE(reviewId));

	return res.data.data;
}
