import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE
} from "@/constants/config.constants.js"

import {
	getAllUserReviews,
	// getReviewById,
	getGuideReviews,
	getPackageReviews,
	getGuideAvgReviews,
	getPackageAvgReviews,

	postReview,
	updateReview,
	deleteReview,

} from "@/api/review.api.js";


export const useGetAllUserReviews = ({limit = DEFAULT_LIMIT, page=DEFAULT_PAGE, ...filters} = {}) => useQuery({
		queryKey: ["reviews", "me" ,{limit, page, filters}],
		queryFn: ()=> getAllUserReviews({ limit, page, filters }),
	})

export const useGetPackageReviews = (pkgId, {limit = DEFAULT_LIMIT, page=DEFAULT_PAGE} = {}) => useQuery({
		queryKey: ["reviews", "package" , {limit, page}],
		queryFn: ()=> getPackageReviews(pkgId, {limit, page}),
		enabled: !!pkgId
	})

export const useGetGuideReviews = (guideId, {limit = DEFAULT_LIMIT, page=DEFAULT_PAGE} = {}) => useQuery({
		queryKey: ["reviews", "guide" ,{limit, page}],
		queryFn: ()=> getPackageReviews(guideId, {limit, page}),
		enabled: !!guideId
	})

export const useGetGuideAvgReviews = (guideId)=> useQuery({
	queryKey: ["review_avg", guideId ],
	queryFn: () => getGuideAvgReviews(guideId)
})

export const useGetPackageAvgReviews = (pkgId)=> useQuery({
	queryKey: ["review_avg", pkgId ],
	queryFn: () => getPackageAvgReviews(pkgId),
	enabled: !!pkgId
})

// export const useGetPackageById = (id)=>useQuery({
// 		quertKey: ["reviews", id],
// 		quertFn: ()=> getReviewById(id)
// 	})
// 
export const usePostReview = ()=>{
	return useMutation({
		mutationFn: (formData) => postReview(formData),
	})
}

export const useUpdateReview = ()=>{
	return useMutation({
		mutationFn: (id, updatedBody) => updateReview(id, updatedBody)
	})
}

export const useDeletePackage = ()=>{
	return useMutation({
		mutationFn: (id) => deleteReview(id)
	})
}


