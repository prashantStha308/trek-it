import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

export const CUSTOM_STATES = Object.apply({
	pending: "pending",
	accepted: "accepted",
	rejected: "rejected",
	expired: "expired"
})

const customRequestSchema = new mongoose.Schema({
	tourist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	guide:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	description: {
		type: String,
		required: [true, ()=> requiredError("CollabRequest.description")]
	},
	status:[{
		type: String,
		enum: {
			values: Object.values(CUSTOM_STATES),
			message: `customRequest's states must be one of ${Object.values(CUSTOM_STATES)}`
		},
		default: CUSTOM_STATES.pending
	}]
});

export const CustomRequest = mongoose.model('CustomRequest', customRequestSchema);