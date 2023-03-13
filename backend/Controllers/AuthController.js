import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// Registering a new User
export const registerUser = async (req, res) => {
    const newUser = await UserModel(req.body);
    const { username } = req.body;
    try {
        // Checking if the username already exists
        const oldUser = await UserModel.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ error: "This username is already registered" });
        };
        const user = await newUser.save();

        // JWT Authentication
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a User
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Checking if user has given password and username both
        if (!username || !password) {
            return res.status(400).json({ error: "Please Enter Username & Password" });
        };
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        };

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ error: "Invalid username or password" });
        };

        // JWT Authentication
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};