import {
    Package,
    Guide
} from "../../models/index.js";
import ApiResponse from "../../utils/ApiResponse.js"


export const getAllRegions = async(req, res) => {
	const [ guideRegions, packageRegions ] = await Promise.all([ Guide.distinct("regions"), Package.distinct("regions") ])

	const regions = [...new Set([...guideRegions, ...packageRegions])];
	return ApiResponse.success(res, {
		data: regions,
		message: "All Regions retrived"
	})
}