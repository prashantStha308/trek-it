import mongoose from "mongoose";
import User from "./user.model.js";


const touristSchema = new mongoose.Schema({
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
});

touristSchema.index({interests: 1});

const Tourist = User.discriminator('tourist', touristSchema);

export default Tourist;