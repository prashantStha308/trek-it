import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";

const chatSchema = new mongoose.Schema({
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
	name:{
		type: String,
		default: ""
	},
	type:{
		type: String,
		enum:{
			values: ["direct", "group"],
			message: "Chat.type can either be direct or group"
		},
		default: "direct"
	},
	lastSeen:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

// By default, set the ChatName to the list of participants. This only runs in creation and never after.
chatSchema.pre('save', async function(next){
	if(this.isNew){
		this.chat = this.participants.join(", ");
	}
})

export const Chat = mongoose.model('Chat', chatSchema);