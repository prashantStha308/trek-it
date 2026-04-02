import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

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
	isAccepted:{
		type: Boolean,
		default: false
	}
});

export const CustomRequest = mongoose.model('CustomRequest', customRequestSchema);