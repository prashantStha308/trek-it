import {Server} from "socket.io";
import {
    socketAuth,
    jsonParse,
} from "../middlewares/chat.middleware.js";
import chatEvents from "../features/chat/chat.events.js";

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
        maxBufferSize: 1e8,
    });

    io.use(socketAuth);

    io.on("connection", (socket)=>{
        console.log("connected:", socket.id, socket.data.user);

        // Handle middleware errors
        socket.on("error", (err) => {
            console.log("Error occured:", err);
            socket.emit("chat:error", { message: err.message });
        });

        socket.use(jsonParse);
        chatEvents(io,socket);

        socket.on("disconnect", ()=>{
            console.log('Client disconnected:', socket.id);
        })
    })

    return io;
}

export default initSocket;