import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { oauth2client } from "../utils/googleConfig.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        console.log("Received code:", code);
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
        if (!code) return res.status(400).json({ message: "Code not provided" });

        // Exchange code for tokens
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);

        // Fetch user info
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        // Check DB
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await userModel.create({
                email,
                name,
                image: picture
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { _id: user._id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT }
        );

        // Return user + token
        return res.status(200).json({
            message: "Success",
            user,
            token,
        });

    } catch (error) {
        console.error("Google OAuth error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Google OAuth failed",
            details: error.response?.data || error.message,
        });
    }
};
