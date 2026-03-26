import mongoose from "mongoose"
import {requiredError} from "../../utils/model.helper.js";

const messageSchema = new mongoose.Schema({
	chat:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation',
		required: true
	},
	sender:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	isEdited:{
		type: Boolean,
		default: false
	},
	isRead:{
		type: Boolean,
		default: false
	},
	type:{
		type: String,
		enum:{
			values: ["text", "image", "file"],
			message: "Value must be one of the listed: text, image or file"
		},
		default: "text"
	},
	content:{
		type: String,
		default: ""
	},
},{
	timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

export default Message;