import { JWT_SECRET } from "../config/env.config.js";
import jwt from "jsonwebtoken";
import User from "../models/user/user.model.js";

const authorize = (allowedRoles = []) => {
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
            throw new Error(403, 'Invalid or expired token');
         }

         if (allowedRoles.length > 0 && !allowedRoles.includes(decodedData.role)) {
            throw new Error(403, `Access denied. Required roles: ${allowedRoles.join(', ')}`);
         }

         const user = await User.findOne({_id: decodedData.id})
         .select('-password')
         .lean()
         .exec();

         if (!user) {
            throw new Error(401, 'User not found');
         }

         req.user = user;
         next();

      } catch (error) {
         next(error);
      }
   }
}

export default authorize;