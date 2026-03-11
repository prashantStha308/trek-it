// Essential packages
import express from "express";
import cors from 'cors';
// configs
import connectDb from './config/db.js';
import {PORT} from "./config/env.config.js";


// app
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
    connectDb();
})