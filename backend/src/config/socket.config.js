import {Server} from "socket.io";
import {socketAuth} from "../middlewares/authorize.js";
import chatEvents from "../features/chat/chat.events.js";

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.use(socketAuth);

    io.on("connection", (socket)=>{
        chatEvents(io,socket);

        socket.on("disconnect", ()=>{
            console.log('Client disconnected:', socket.id);
        })
    })

    return io;
}

export default initSocket;