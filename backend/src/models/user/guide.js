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
	}
}));

Guide.index({region: 1});

Guide.pre('save',function(next){
	// some code

	next();
})

export default Guide;