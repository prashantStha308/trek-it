import chatHandler from "./chat.handler.js";
import { socketErrorHandler } from "../../middlewares/errorHandler.js"

function chatEvents(io, socket){
    console.log("registering chat events for", socket.id);
    
	const handler = chatHandler(io, socket);

	socket.on("chat:create", socketErrorHandler(socket, handler.createChat) );
	socket.on("chat:join", socketErrorHandler(socket, handler.join) );

	socket.on("chat:read", socketErrorHandler(socket, handler.readLatest));
	
	socket.on("chat:send", socketErrorHandler(socket, handler.sendMessage));
	// socket.on("chat:sendFile", socketErrorHandler(socket, handler.sendMessage));
	// socket.on("chat:sendImage", socketErrorHandler(socket, handler.sendMessage));

	socket.on("chat:update", socketErrorHandler(socket, handler.updateMessage));

	// socket.on("chat:delete", handler.deleteMessage);

}

export default chatEvents;