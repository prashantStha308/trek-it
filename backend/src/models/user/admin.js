import mongoose from "mongoose";
import User from "./user.js";

const adminSchema = new mongoose.Schema({
	permissions:{
		type: [String],
		default: []
	},
	position:{
		type: String,
		enum:{
			values: ["clerk", "manager", "ceo"],
			message: "position value is not valid"
		},
		default: "clerk"
	}
});


const Admin = User.discriminator('admin', adminSchema);

export default Admin;