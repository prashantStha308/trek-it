// Essential packages
import express from "express";
import cors from 'cors';
import {createServer} from "node:http";
// configs
import connectDb from './config/db.js';
import {PORT} from "./config/env.config.js";
import initSocket from "./config/socket.config.js";
// Middlewares
import errorHandeler from "./middlewares/errorHandeler.js"
// routes
import userRouter from "./features/users/users.routes.js"


// app
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));

// Keep at end
app.use(errorHandeler);

// routes
app.use('/api/user.model', userRouter);


const httpServer = createServer(app);
initSocket(httpServer);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
    connectDb();
})