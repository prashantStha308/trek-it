import chatController from "./chat.controller.js";

function chatEvents(io, socket){
	const user = socket.data.user;
	const controller = chatController(io, socket);

	socket.on("chat:join", controller.join );
}

export default chatEvents;