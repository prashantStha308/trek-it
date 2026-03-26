import ApiError from "./ApiError.js";

/**
 * @description Retrieves Many Data from MongoDb for a specific Model
 * 
 * @param {import("mongoose").Model} Model - The mongoose model that is to be retrived 
 * @param {Object} [options]
 * @param {number} [options.limit=10] - Max number of docs to return 
 * @param {number} [options.page=1] - index 1 based pagination value 
 * @param {Object} [options.filter={}] - Filter object. Retrive data that satisfies the data in filter object
 * @param {String} [options.select] - Fields to include or exclude from docs
 * @param {Object} [options.sort = {createdAt: -1}] - Sorting object
 * @param {string|Object} [options.populate] - Paths to populate from other collections.
 * 
 * @returns {Promise<{ docs: any[], total: number, totalPages: number, page: number, limit: number }>} Object containing documents and pagination info.
 */

export const getAll = async (Model, {
	limit = 10,
	page = 1,
	filter = {},
	select,
	sort = { createdAt: -1 },
	populate,
} = {}) => {

	limit = math.max(parseInt(limit), 10);
	page = math.max(parseInt(page), 1);

	let query = Model.find(filter)
		.skip((page - 1) * limit)
		.limit(limit)
		.sort(sort);

	if(select) query = query.select(select);
	if(populate) query = query.populate(populate);

	let docs = await query.lean();
	const total = await Model.countDocuments(filter);

	return { docs, total, totalPages: Math.ceil(total / limit), page, limit };
};

/**
 * @description Retrieves a single document by ID for a given Mongoose model.
 *
 * @param {import("mongoose").Model} Model - The Mongoose model to query.
 * @param {string} id - ID of the target document.
 * @param {Object} [options]
 * @param {string|Object} [options.select="-password"] - Fields to include or exclude.
 * @param {string|Object} [options.populate] - Paths to populate from other collections.
 *
 * @returns {Promise<Object>} The retrieved document as a plain JavaScript object.
 *
 * @throws {ApiError} If the ID is invalid or the document is not found.
 */

export const getById = async (Model, id, {
	select = "-password",
	populate
}) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400,"Invalid ID");
	}

	let query = Model.findById(id)
	
	if(select) query = query.select(select);
	if(populate) query = query.populate(populate);
	
	const doc = await query.lean();

	if (!doc) {
		throw new ApiError(404,"Resource not found");
	}

	return doc;
}