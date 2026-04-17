import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";
import { BOOKING_STATUS } from "../../constants/booking.constant.js";

const bookingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	tourist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	guide:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	package:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Package',
		required: true
	},
	customRequest:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CustomRequest',
		default: null
	},
	status:{
		type: String,
		enum:{
			values: BOOKING_STATUS,
			message: `{VALUE} must be one of [${BOOKING_STATUS.join(" ,")}]`
		},
		required: true,
		default: BOOKING_STATUS[0]
	},
	date:{
		type: Date,
		required: true
	},
	groupSize:{
		type: Number,
		min: 1,
		required: true,
	},
	payment:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Payment',
		default: null
	},
	totalPrice:{
		type: Number,
		required: true,
		min: 0
	}
},{
	timestamps: true
});

// indexes
bookingSchema.index({ tourist: 1 });
bookingSchema.index({ guide: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ date: 1 });

// hooks

// model
export const Booking = mongoose.model('Booking', bookingSchema);