// Essential packages
import express from "express";
import cors from 'cors';
import {createServer} from "node:http";
// configs
import connectDb from './config/db.js';
import {PORT} from "./config/env.config.js";
import initSocket from "./config/socket.config.js";
import routers from "./config/route.config.js";
// Middlewares
import {errorHandler} from "./middlewares/errorHandler.js"

// app
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));

// routes
// Apply all the routes in ./config/route.config.js
/*
    routers = [{base: '/api/__', router: ExpressRouterObject}]
*/
routers.forEach(route => {
    app.use(route.base, route.router)
});

// Keep at end
app.use(errorHandler);

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
    connectDb();
})