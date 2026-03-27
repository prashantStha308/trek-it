import chatHandler from "./chat.handler.js";
import {chatAsyncHandler} from "../../middlewares/errorHandler.js"

function chatEvents(io, socket){
    console.log("registering chat events for", socket.id);
    
	// const user = socket.data.user;
	const handler = chatHandler(io, socket);

	socket.on("chat:create", chatAsyncHandler(socket, handler.createChat) );
	socket.on("chat:join", chatAsyncHandler(socket, handler.join) );

	socket.on("chat:read", chatAsyncHandler(socket, handler.readLatest));
	
	socket.on("chat:send", chatAsyncHandler(socket, handler.sendMessage));
	socket.on("chat:sendFile", chatAsyncHandler(socket, handler.sendMessage));
	socket.on("chat:sendImage", chatAsyncHandler(socket, handler.sendMessage));

	socket.on("chat:update", chatAsyncHandler(socket, handler.updateMessage));

	// socket.on("chat:delete", handler.deleteMessage);

}

export default chatEvents;