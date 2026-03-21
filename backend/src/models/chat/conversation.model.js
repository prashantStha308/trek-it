import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";

const conversationSchema = new mongoose.Schema({
	participants:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	lastMessage:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message',
		default: null
	},
	conversationName:{
		type: String,
		default: ""
	},
	type:{
		type: String,
		enum:{
			values: ["direct", "group"],
			message: "conversation.type can either be direct or group"
		},
		default: "direct"
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