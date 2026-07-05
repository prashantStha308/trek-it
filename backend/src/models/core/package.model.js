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
	activities: {
		type: [String],
		validate: {
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one activity is required"
		}
	},
	regions: {
		type: [String],
		validate: {
			validator: (v) => Array.isArray(v) && v.length >= 1,
			message: "At least one activity is required"
		}
	},
	pricePerPerson: {
		type: Number,
		required: [true, () => requiredError("Package.pricePerPerson")]
	},

	minGroupSize: {
		type: Number,
		required: [true, () => requiredError("Package.minGroupSize")]
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

	stops:{
		type:[{
		    day: { 
		    	type: Number,
			    default: 1
			},
		    landmark: {
		    	type: String,
		    	default: ""
			},
			
		    nearestCity: {
			    name: {
			    	type: String,
			    	default: ""
			    },
			    lat: { type: Number },
			    long: { type: Number },
		    },

		    type: {
		    	type: String,
		    	default: ""
		    },
		    customType: {
		    	type: String,
		    	default: ""
		    },
		}],
		default: []
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
		src: {
			type: String,
			default: ""
		},
		publicId: {
			type: String,
			default: ""
		}
	},
	isActive:{
		type: Boolean,
		default: false
	},
	requiresPermit: {
		type: Boolean,
		default: false
	},
	permitDetails:{
		type: String,
		default: ""
	},

	verified: {
		type: Boolean,
		default: false
	},
	
}, { timestamps: true });

packageSchema.index({ guide: 1 });
packageSchema.index({ regions: 1 });
packageSchema.index({ type: 1 });
packageSchema.index({ startingPrice: 1 });


export const Package = mongoose.model("Package", packageSchema);

