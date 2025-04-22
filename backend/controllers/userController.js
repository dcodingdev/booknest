

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// ✅ Function to generate a JWT
export const generateToken = (user) => {
    // JWT payload containing user information
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email, // You can also include the role if needed
    };

    // JWT options: expiresIn specifies the token's expiration time (e.g., 1 hour)
    const options = { expiresIn: "7d" };

    // Generate and return the JWT
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};

// ✅ Register User & Return JWT
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Register request body:", req.body); // Log request body for debugging

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user),// ✅ Return JWT in response
            message: "User registered successfully!"
        });
        // res.status(201).json({ message: "User registered successfully!" });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// ✅ Login User & Return JWT
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request body:", req.body); // Log request body for debugging

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    try {
        console.log(`Attempting to find user with email: ${email}`); // Log email for debugging
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User not found with email: ${email}`); // Log email for debugging
            res.status(401);
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401);
            throw new Error("Invalid password");
        }

        const token = generateToken(user); // ✅ Generate JWT Token

        res.status(200).json({ token }); // ✅ Sends response to frontend (Axios will receive this)
                                         // This becomes `res.data` in Axios
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "Error logging in" });
    }
});

// ✅ Get Current User (Protected)
export const currentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "User not found or unauthorized" });
    }

    res.status(200).json(req.user);
});