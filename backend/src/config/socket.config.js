import {Server} from "socket.io";
import {
    socketAuth,
    jsonParse,
} from "../middlewares/chat.middleware.js";
import {
    setIo
} from "../utils/io.socket.js";

import chatEvents from "../features/chat/chat.events.js";
import notificationEvents from "../features/notifications/notification.events.js";

import { FRONTEND_URL } from "./env.config.js";

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
        maxBufferSize: 1e8,
    });

    io.use(socketAuth);

    io.on("connection", (socket)=>{
        console.log("connected:", socket.id, socket.data.user);
        
        socket.join(socket.data.user._id.toString());

        // Handle middleware errors
        socket.on("error", (err) => {
            console.log("Error occured:", err);
            socket.emit("socket:error", { message: err.message });
        });

        socket.use(jsonParse);
        chatEvents(io, socket);
        notificationEvents(io, socket);

        socket.on("disconnect", ()=>{
            console.log('Client disconnected:', socket.id);
        })
    })

    setIo(io);
    return io;
}

export default initSocket;