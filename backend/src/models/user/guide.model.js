import mongoose from "mongoose";
import { User } from "./user.model.js";
import validator from "validator"; 


const guideSchema = new mongoose.Schema({
	languages: {
		type: [String],
		required: false,
		validate: {
			validator: (v) => !v || v.length === 0 || v.every(l => typeof l === 'string'),
			message: "At least one language is required to be set"
		}
	},
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
	isAvailable: {
		type: Boolean,
		default: true	
	},
	isTrusted:{
		type: Boolean,
		default: false
	},
	trekCount:{
		type: Number,
		min: 0,
		default: 0
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	daysBooked: {
		type: [Date],
		default: []
	}
});

guideSchema.index({regions: 1});
guideSchema.index({specialities: 1});
guideSchema.index({isVerified: 1});


export const Guide = User.discriminator('guide', guideSchema);