import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

const collabRequestSchema = new mongoose.Schema({
	package:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Package'
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
},{
	timestamps: true
});

export const CollabRequest = mongoose.model('CollabRequest', collabRequestSchema);