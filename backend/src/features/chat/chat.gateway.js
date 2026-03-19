import {Server} from "socket.io";
// Services
import { saveMessageToDb} from "./chat.service.js"

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    
}


export default initSocket;