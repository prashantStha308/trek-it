import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";

const messageSchema = new mongoose.Schema({
	conversation:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation',
		required: true
	},
	sender:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	receiver:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	isEdited:{
		type: Boolean,
		default: false
	},
	isRead:{
		type: Boolean,
		default: false
	},
	fileUrl:{
		type: String,
		default: ""
	},
	content:{
		type: String,
		default: ""
	},
	type:{
		type: String,
		enum:{
			values: ["text", "file", "image", "link"],
			message: "{VALUE} is not a valid message type"
		},
		deafult: "text"
	},
	readAt:{
		type: Date,
		deafult: null
	}
},{
	timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

export default Message;