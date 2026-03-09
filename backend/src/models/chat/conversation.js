import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";

const conversationSchema = new mongoose.Schema({
	participants:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	lasMessage:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message',
		default: ""
	},
	lasMessageAt:{
		type: Date,
		deafult: null
	},
	conversationName:{
		type: String,
		deafult: ""
	}
});

// By default, set the conversationName to the list of participants. This only runs in creation and never after.
conversationSchema.pre('save', function(next){
	if(this.isNew){
		this.conversationName = this.participants.join(", ");
	}
	next();
})

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;