import chatController from "./chat.controller.js";

function chatEvents(io, socket){
	const user = socket.data.user;
	const controller = chatController(io, socket);

	socket.on("chat:join", controller.join );
	socket.on("chat:create", controller.createChat );
	socket.on("chat:send", controller.sendMessage);

}

export default chatEvents;