// Essential packages
import express from "express";
import cors from 'cors';
import {createServer} from "node:http";
// configs
import connectDb from './config/db.js';
import {PORT} from "./config/env.config.js";
import initSocket from "./config/socket.config.js";
// Middlewares
import {errorHandler} from "./middlewares/errorHandler.js"
// routes
import userR from "./features/users/users.routes.js"
import authR from "./features/auth/auth.routes.js"
import chatR from "./features/chat/chat.routes.js"
import reviewR from "./features/reviews/reviews.routes.js";


// app
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/user', userR);
app.use('/api/auth', authR);
app.use('/api/chat', chatR);
app.use('/api/review', reviewR);


// Keep at end
app.use(errorHandler);

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
    connectDb();
})