// Essential packages
import express from "express";
import cors from 'cors';
import {config} from "dotnet";
import import {connectDb} from './config/db.js';

config();
// app
const app = express();

// Middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
    connectDb();
})