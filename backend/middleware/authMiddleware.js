// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import { ACCESS_TOKEN_SECRET } from "../config.js";

// // ✅ Middleware to verify JWT token
// export const verifyToken = async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.authorization || req.headers.Authorization;

//     if (authHeader && authHeader.startsWith("Bearer")) {
//         try {
//             token = authHeader.split(" ")[1];

//             if (!token) {
//                 return res.status(401).json({ message: "❌ Access Denied. No Token Provided." });
//             }

//             const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
//             req.user = decoded.user; //Store user data for the request lifecycle

//             next(); // ✅ Move to the next middleware
//         } catch (error) {
//             return res.status(401).json({ message: "User is not authorized, invalid token" });
//         }
//     } else {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }
// };
// // ✅ Middleware to verify JWT token

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { ACCESS_TOKEN_SECRET } from '../config.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});