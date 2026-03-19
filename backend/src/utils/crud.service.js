export const getAll = async(Model, {limit = 10, page = 1, filter:{}} = {})=>{
	const docs = await Model.find(filter)
		.skip((page - 1) * limit)
		.limit(limit)
		.lean();

	return docs;
}

export const getById = async(Model, id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error("Invalid ID");
	}

	const doc = await Model.findById(id).select("-password").lean();
	if (!doc) {
		throw new Error("Resource not found");
	}

	return doc;
}