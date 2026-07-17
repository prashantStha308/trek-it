import mongoose from "mongoose"
import { Package } from "./package.model.js";
import { Guide } from "../user/guide.model.js";


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
	package:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Package',
		default: null
	},
	comment:{
		type: String,
		required: true,
	},
	rating:{
		services:{
			type: Number,
			min: 0,
			max: 5,
			default: 0
		},
		interactivity:{
			type: Number,
			min: 0,
			max: 5,
			default: 0
		},
		activities:{
			type: Number,
			min: 0,
			max: 5,
			default: 0	
		}
	},
	images:{
		type: [{
			src: {
				type: String,
				default: ""
			},
			publicId: {
				type: String,
				default: ""
			}
		}],
		default: [{ src: "", publicId: "" }]
	}
},{
	timestamps: true
})

// Indexes
reviewSchema.index({ rating: 1 });
reviewSchema.index(
	{
		package: 1,
		reviewer: 1
	},
	{
		unique: true,
		partialFilterExpression: {
			package: {
				$exists: true, 
				$ne: null
			}
		}
	}
);

reviewSchema.index(
	{ guide: 1, reviewer: 1 },
	{
		unique: true,
		partialFilterExpression: {
			guide: {
				$exists: true,
				$ne: null
			}
		}
	}
);

const updateRelated = async (doc) => {
    if (!doc) return;

    const target = doc.package 
        ? { Model: Package, field: "package" } 
        : { Model: Guide, field: "guide" };

    const id = doc[target.field];

    const stats = await Review.aggregate([
        { $match: { [target.field]: id } },
        { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    await target.Model.findByIdAndUpdate(id, {
        averageRating: stats[0]?.avg ?? 0,
        reviewCount: stats[0]?.count ?? 0,
    });
};

reviewSchema.post('findOneAndDelete', updateRelated)
reviewSchema.post('findOneAndUpdate', updateRelated)


export const Review = mongoose.model('Review', reviewSchema);

