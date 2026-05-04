import mongoose from "mongoose";
import { requiredError } from "../../utils/model.helper.js";
import { PACKAGE_TYPES } from "../../constants/package.constant.js";

const packageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, () => requiredError("Package.name")],
		trim: true,
	},
	description: {
		type: String,
		required: [true, () => requiredError("Package.description")],
	},
	guide: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, () => requiredError("Package.guide")],
	},
	tourist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null,
	},
	customRequest: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CustomRequest',
		default: null,
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
			values: PACKAGE_TYPES,
			message: `{VALUE} must be one of [${PACKAGE_TYPES.join(" ,")}]`
		},
		default: PACKAGE_TYPES[0]
	},
	startingPrice: {
		type: Number,
		min: [10, "Starting price must be at least 10"],
		required: [true, () => requiredError("Package.startingPrice")]
	},
	pricePerPerson: {
		type: Number,
		min: 10,
		required: [true, () => requiredError("Package.pricePerPerson")]
	},
	maxGroupSize: {
		type: Number,
		required: [true, () => requiredError("Package.maxGroupSize")]
	},
	daysAlloted: {
		type: Number,
		min: [1, "Package.daysAlloted must be at least 1"],
		required: [true, () => requiredError("Package.daysAlloted")],
	},

	/*
		is it necessary to set dates? Need to re think on this model

		This was removed as adhering to this would mean our model will abandon private guides and move to more shared/public package model.
	*/
	// dates: [{
	// 	date: { type: Date, required: [true, () => requiredError("Package.dates.date")] },
	// 	spotsTotal: { type: Number, required: [true, () => requiredError("Package.dates.spotsTotal")] },
	// 	spotsLeft: { type: Number, required: [true, () => requiredError("Package.dates.spotsLeft")] },
	// 	isOpen: { type: Boolean, default: true }
	// }],

	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	bookingCount: {
		type: Number,
		default: 0
	},
	images: [{
		src: {
			type: String,
			default: ""
		},
		publicId: {
			type: String,
			default: ""
		}
	}],
	thumbnail: {
		type: String,
		default: ""
	},
	verified: {
		type: Boolean,
		default: false
	},
	requiresPermit: {
		type: Boolean,
		default: false
	}

}, { timestamps: true });

packageSchema.index({ guide: 1 });
packageSchema.index({ regions: 1 });
packageSchema.index({ type: 1 });
packageSchema.index({ startingPrice: 1 });


export const Package = mongoose.model("Package", packageSchema);

