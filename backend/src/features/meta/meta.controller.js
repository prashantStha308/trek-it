import {
    Package,
    Guide
} from "../../models/index.js";
import ApiResponse from "../../utils/ApiResponse.js"

import {getMetaService} from "./meta.service.js";


const makeMetaController = (field, models = [ Package, Guide ]) => {
	return (async (req, res) => {

		const {sort = -1, limit = 10, page = 1} = req.query;
		const fieldData = await getMetaService(field, models, {limit, page, sort});

		return ApiResponse.success(res, {
			data: fieldData,
			message: `${field.charAt(0).toUpperCase()}${field.slice(1)} data retrieved`
		})
	})
}

export const getAllRegions = makeMetaController("regions", [Package, Guide]);
export const getAllActivities = makeMetaController("activities", [Package, Guide]);
export const getAllSpecialities = makeMetaController("specialities", [Guide]);
