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
	profilePicture:{
		src:{
			type: String,
			required: false,
			validate:{
				validator: (v) => validator.isURL(v),
				message: "User.profilePicture.src must be a valid URL"
			},
		},
		publicId:{
			type: String,
			default: ""
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
	    required: false,
	    validate: {
	        validator: (v) => !v || v.length === 0 || v.every(l => typeof l === 'string'),
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
userSchema.pre('save', async function(){
    if(this.languages && this.languages.length > 0){
        this.languages = this.languages.map(lang => lang.trim().toLowerCase());
    }
    if(this.interests && this.interests.length > 0){
        this.interests = this.interests.map(i => i.trim().toLowerCase());
    }
    console.log("Before next");
})

userSchema.pre('findOneAndUpdate', async function(next) {
	const update = this.getUpdate();

	if(update.languages){
		update.languages = update.languages.map(l => l.trim().toLowerCase());
	}
});


export const User = mongoose.model('User', userSchema);