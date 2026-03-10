import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
	reviewer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	guide:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},
	booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Booking',
		default: null		
	},
	package:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Package',
		default: null
	},
	title:{
		type: String,
		required: true,
	},
	description:{
		type: String,
		required: true,
	},
	rating:{
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	images:{
		type: [String],
		default: []
	}
},{
	timestamps: true
})

// Indexes
reviewSchema.index({ booking: 1 }, { unique: true });
reviewSchema.index({ guide: 1 });
reviewSchema.index({ rating: 1 });



const Review = mongoose.model('Review', reviewSchema);

export default Review;