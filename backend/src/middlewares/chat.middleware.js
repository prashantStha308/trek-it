import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import cookie from "cookie";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/index.model.js";

// Authorization for socket
export const socketAuth = async (socket, next) => {
    try {
      // extract cookie that are sent from frontend
      // make sure to set cookie from express
        const cookies = cookie.parse(socket.handshake.headers.cookie);
        const token = cookies.token;

        if (!token) return next(new ApiError(401, 'Unauthorized'));

        let decodedData;
        try {
            decodedData = jwt.verify(token, JWT_SECRET);
        } catch (e) {
            return next(new ApiError(403, 'Invalid or expired token'));
        }

        const user = await User.findOne({ _id: decodedData.id })
            .select('-password')
            .lean()
            .exec();

        if (!user) return next(new ApiError(401, 'User not found'));

        socket.data.user = user;
        next();

    } catch (error) {
        next(error);
    }
};

/**
 * @describe Parses to a JavaScript Object if the received data is a valid JSON, else passes an error to the next function
 **/
export const jsonParse = (args, next) => {
    try {
        args[1] = typeof args[1] === "string" ? JSON.parse(args[1]) : args[1];
        console.log("middleware: ", args[1])
        next();
    } catch (e) {
        next(new Error("Invalid JSON"));
    }
}