import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

const paymentSchema = new mongoose.Schema({
	paidBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Booking',
		required: true
	},
	status:{
		type: String,
		enum:{
			values: ["pending", "confirmed", "conflict"],
			message: "${VALUE} is not an appropriate value"
		},
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	transactionId:{
		type: String,
		required: true
	},
	method:{
		type: String,
		required: true
	}
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;