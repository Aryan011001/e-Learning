import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAUth=async(req, res, next)=>{
    try {
        const token = req.headers.token 
        if(!token){
            return res.status(403).json({
                message:"Please login",
            });
        }

        const decodeData=jwt.verify(token, process.env.JWT_Sec);

        req.user=await User.findById(decodeData._id);
        next();
    } catch (error) {
        res.status(t00).json({
            message: error.message
        })
    }
}