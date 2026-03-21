/**
 * @file Authorize Middleware
 * @description middleware responsible for authorizing access to controllers along with attactching user data to req header
 *
 * @author Prashant Shrestha
 * @created March 2, 2026
 */

import jwt from "jsonwebtoken";
import cookie from "cookie";
import { JWT_SECRET } from "../config/env.config.js";

import ApiError from "../utils/ApiError.js";
import User from "../models/user/user.model.js";

export const authorize = (allowedRoles = []) => {
   return async ( req , res , next ) => {
      try {
         const authHeader = req.headers['authorization'];
         const token = authHeader && authHeader.split(' ')[1];
         if (!token ) {
            return res.sendStatus(401);
         }
         
         let decodedData;
         try{
            decodedData = jwt.verify(token, JWT_SECRET);
         }catch(e){
            throw new ApiError(403, 'Invalid or expired token');
         }

         if (allowedRoles.length > 0 && !allowedRoles.includes(decodedData.role)) {
            throw new ApiError(403, `Access denied. Required roles: ${allowedRoles.join(', ')}`);
         }

         const user = await User.findOne({_id: decodedData.id})
         .select('-password')
         .lean()
         .exec();

         if (!user) {
            throw new ApiError(401, 'User not found');
         }

         req.user = user;
         next();

      } catch (error) {
         next(error);
      }
   }
}

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