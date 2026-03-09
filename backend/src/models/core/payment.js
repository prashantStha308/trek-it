import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

const paymentSchema = new mongoose.Schema({
	tourist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	guide:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	package:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Package'
	},
	booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Booking'
	}
});