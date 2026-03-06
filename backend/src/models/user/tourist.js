import mongoose from "mongoose";
import User from "./user.js";

const Tourist = User.discriminator('tourist', new mongoose.Schema({
	interests:{
		type: [String],
		validate:{
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one interest is required",
		}
	},
	wishlist:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Package",
		default: [],
	},
	preferredLanguages:{
		type: [String],
		default: [],
	}

}));

export default Tourist;