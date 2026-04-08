import { socketErrorHandler } from "../../middlewares/errorHandler.js";
import notificationHandler from "./notification.handler.js";

export default function notificationEvents(io, socket) {
    const handler = notificationHandler(io, socket);
    const userId = socket.data.user._id;

    socket.join(userId);

    socket.on("notification:markAllRead", socketErrorHandler( handler.handleReadAll ));
    socket.on("notification:markRead", socketErrorHandler( handler.handleRead ));
}