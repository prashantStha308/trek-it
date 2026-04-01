import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";


const packageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, () => requiredError("Package.name")],
		trim: true,
	},
	description:{
		type: String,
		required: [true, () => requiredError("Package.description")],
	},
	guide: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, () => requiredError("Package.guide")],
	},
	collaborators: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	keywords: {
		type: [String],
		validate: {
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one keyword is required"
		}
	},
	regions: {
		type: [String],
		validate: {
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one region is required"
		}
	},
	activities: {
		type: [String],
		validate: {
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one activity is required"
		}
	},
	type: {
		type: String,
		enum: {
			values: ["fixed", "custom"],
			message: "{VALUE} must be either 'fixed' or 'custom'"
		},
		default: "fixed"
	},
	startingPrice: {
		type: Number,
		min: [10, "Starting price must be at least 10"],
		required: [true, () => requiredError("Package.startingPrice")]
	},
	maxGroupSize: {
		type: Number,
		min: [1, "Group size must be at least 1"],
		default: 1
	},
	daysAlloted: {
		type: Number,
		min: [1, "Package.daysAlloted must be at least 1"],
		required: [true, () => requiredError("Package.daysAlloted")],
	},
	dates: [{
		date: { type: Date, required: [true, () => requiredError("Package.dates.date")] },
		spotsTotal: { type: Number, required: [true, () => requiredError("Package.dates.spotsTotal")] },
		spotsLeft: { type: Number, required: [true, () => requiredError("Package.dates.spotsLeft")] },
		isOpen: { type: Boolean, default: true }
	}],
	reviews:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review'
	}],
	rating:{
		type: Number,
		min: 0,
		max: 5,
		deafult: 0
	},
	images:{
		type: [String],
		default: []
	},
	thumbnail:{
		type: String,
		deafult: ""
	},
	requiresPermit: {
		type: Boolean,
		deafult: false
	}

}, { timestamps: true });

packageSchema.index({ guide: 1 });
packageSchema.index({ regions: 1 });
packageSchema.index({ type: 1 });
packageSchema.index({ startingPrice: 1 });

export const Package = mongoose.model("Package", packageSchema);

