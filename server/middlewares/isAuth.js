// middlewares/isAuth.js
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {  // Corrected to isAuth
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({
                message: "Please login",
            });
        }

        const decodeData = jwt.verify(token, process.env.JWT_Sec);

        req.user = await User.findById(decodeData._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message  // Corrected status code to 500
        });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "You are not an admin"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
