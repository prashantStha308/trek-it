// import all models here and export from here

// Chat
import Chat from "./chat/chat.model.js"
import Message from "./chat/message.model.js"

// Core
import Booking from "./core/booking.model.js"
import Package from "./core/package.model.js"
import Payment from "./core/payment.model.js"
import Review from "./core/review.model.js"

// Requests
import collabRequest from "./requests/collabRequest.model.js"
import customRequest from "./requests/customRequest.model.js"

// User
import {
	User,
	Guide,
	Tourist,
	Admin
} from "./user/index.model.js";

export {
	Chat,
	Message,

	Booking,
	Package,
	Payment,
	Review,

	collabRequest,
	customRequest,

	User,
	Guide,
	Tourist,
	Admin,
}