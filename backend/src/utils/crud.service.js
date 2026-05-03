import mongoose from "mongoose";
import ApiError from "./ApiError.js";
import ApiResponse from "./ApiResponse.js";


/**
 * @description Retrieves Many Data from MongoDb for a specific Model
 * 
 * @param {mongoose.Model} Model - The mongoose model that is to be retrived 
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

	limit = Math.max(parseInt(limit), 10);
	page = Math.max(parseInt(page), 1);

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
 * @param {mongoose.Model} Model - The Mongoose model to query.
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
	populate,
	filter = {}
} = {}) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400,"Invalid ID");
	}

	let query = Model.findOne({ _id: id, ...filter });
	
	if (select) query = query.select(select);
	if (populate) query = query.populate(populate);
	
	const doc = await query.lean();

	if (!doc) {
		throw new ApiError(404,`${Model.toString()} not found`);
	}

	return doc;
}

/**
 * @description Deletes a document by ID from the given Mongoose model.
 *
 * @param {mongoose.Model} Model - The Mongoose model to delete from.
 * @param {string} id - The ID of the document to delete.
 * @param {Object} [filter={}] - Additional filter conditions alongside the ID.
 * @param {Function} [callback] - Optional cleanup function called after successful deletion.
 * @returns {Promise<Object>} The result of the delete operation.
 * @throws {ApiError} 400 - If the provided ID is not a valid ObjectId.
 * @throws {ApiError} 404 - If no document matching the ID and filter is found.
 */
export const deleteById = async (Model, id, filter = {}, callback) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    const result = await Model.deleteOne({ _id: id, ...filter });

    if (result.deletedCount === 0) {
        throw new ApiError(404, `${Model.modelName} not found`);
    }

    if (callback) await callback();

    return result;
}

/**
 * Deletes multiple documents from the given Mongoose model matching the filter.
 *
 * @param {mongoose.Model} Model - The Mongoose model to delete from.
 * @param {Object} [filter={}] - Filter conditions to match documents for deletion.
 * @param {Function} [callback] - Optional cleanup function called after successful deletion.
 * @returns {Promise<Object>} The result of the delete operation, including deletedCount.
 */
export const deleteBulk = async (Model, filter = {}, callback) => {

	if (Object.keys(filter).length === 0) {
        throw new ApiError(400, "Filter cannot be empty for bulk delete");
	}
	
    const result = await Model.deleteMany(filter);

    if (callback) await callback();

    return result;
}

/**
 * @description - Creates a generic search controller for a given model
 * 
 * @param {mongoose.Model} Model - The mongoose model to search
 * @param {String[]} fields - Fields to search against
 * @param {Object} [options] - Additional getAll options (populate, select, sort etc.)
 * @returns {Function} - Express controller function
 */
export const createSearchController = (Model, fields, options = {}) => {
    return async (req, res) => {
        const { query, limit, page } = req.query;

        if (!query || query.trim() === "") {
            throw new ApiError(400, "Search query is required");
        }

        const regex = { $regex: query, $options: "i" };

        const filter = {
            $or: fields.map(field => ({ [field]: regex }))
        };

        const results = await getAll(Model, {
            limit,
            page,
            filter,
            ...options
        });

        ApiResponse.success(res, {
            data: results,
            message: "Search results retrieved successfully"
        });
    };
};