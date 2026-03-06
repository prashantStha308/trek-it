import mongoose from "mongoose";
import validator from "validator"; 

const options = {
	discriminatorKey: "role",
	timestamps: true
}

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		trim: true,
		minLength: 2,
		maxLength: 50
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate:{
			validator: (v) => validator.isEmail(v),
			message: "Invalid email address"
		},
		unique: true,
	},
	password:{
		type: String,
		required: true,
		minLength: 8,
		validate: {
			validator: (v) => validator.isStrongPassword(v,{
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1
			}),
			message: "Password must contain uppercase, lowercase, number and symbol"
		}
	},
	role:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: {
			values:["admin", "tourist", "guide"],
			message: "{VALUE} is not a valid role."
		}
	},
	gender: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: {
			values: ["male", "female", "others"],
			message: "{VALUE} is not a valid gender"
		}
	},
	age:{
		type: Number,
		required: true,
		min: 18,
		max: 80,
	},
	languages: {
		type: [String],
		validate:{
			validator: (v) => Array.isArray(v) &&  v.length >= 1,
			message: "At least one language is required to be set"
		}
	},
	location: {
		country: {
			type: String,
			required: [true, 'Country is required'],
			trim: true,
			lowercase: true,
		},
		state: {
			type: String,
			required: false,
			trim: true,
			lowercase: true
		}
	},
}, options);

// indexes
userSchema.index({ age: 1 });
userSchema.index({ gender: 1 });
userSchema.index({ languages: 1 });
userSchema.index({ 'location.country': 1 });
userSchema.index({ 'location.state': 1 });

// mongoose middlewares
userSchema.pre('save', (next)=>{
	this.languages = this.languages.map(lang => lang.trim().toLowerCase());
	if(this.interests){
		this.interests = this.interests.map(lang => lang.trim().toLowerCase());
	}

	next();
})


const User = new mongoose.model('User', userSchema);
export default User;