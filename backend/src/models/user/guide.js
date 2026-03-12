import mongoose from "mongoose";
import User from "./user.js";

const Guide = User.discriminator('guide', new mongoose.Schema({
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
	}
}));

Guide.index({regions: 1});

Guide.pre('save',function(next){
	// some code

	next();
})

export default Guide;