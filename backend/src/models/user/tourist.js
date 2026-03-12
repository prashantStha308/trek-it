import mongoose from "mongoose";
import User from "./user.js";

const Tourist = User.discriminator('tourist', new mongoose.Schema({
	interests:{
		type: [String],
		default: []
	},
	wishlist:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Package",
		default: [],
	},
	preferredLanguages:{
		type: [String],
		default: [],
	},
}));

Tourist.index({interests: 1});

export default Tourist;