import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";


const bookingSchema = new mongoose.Schema({
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
	type:{
		type: String,
		enum:{
			values: ["fixed", "custom"],
			message: "{VALUE} is not a valid type"
		}
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
			values: ["pending", "confirmed", "cancelled", "completed"],
			message: "{VALUE} is not a valid status"
		}
		required: true,
		default: "pending"
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
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;