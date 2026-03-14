// import all models here and export from here

// Chat
import Conversation from "./chat/conversation.model.js"
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
import Guide from "./user/guide.model.js";
import Tourist from "./user/tourist.model.js";

// import Admin from "./user/admin.model.js";

export {
	Conversation,
	Message,

	Booking,
	Package,
	Payment,
	Review,

	collabRequest,
	customRequest,

	Guide,
	Tourist,
	
	// Admin,
}