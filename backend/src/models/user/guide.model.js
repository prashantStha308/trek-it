import mongoose from "mongoose";
import {User} from "./user.model.js";


const guideSchema =  new mongoose.Schema({
	regions:{
		type: [String],
		validate:{
			validator: (v) => Array.isArray(v) && v.length > 0,
			message: "Guides must pick up at least one region"
		}
	},
	collaborations:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Package"
	},
	specialities:{
		type: [String],
		trim: true,
		default: []
	},
	packageCount: {
		type: Number,
		default: 0,
	},
	isVerified:{
		type: Boolean,
		default: false
	},
	review: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Review"
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	}
});

guideSchema.index({regions: 1});
guideSchema.index({specialities: 1});
guideSchema.index({isVerified: 1});


export const Guide = User.discriminator('guide', guideSchema);