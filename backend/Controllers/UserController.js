import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// Get A User
export const getUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await UserModel.findById(_id).select("-password");
        // Checking if user exists 
        if (!user) {
            return res
                .status(404)
                .json({ error: "User does not exist" });
        };
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            // fetching password out of the user details
            const { password, ...otherDetails } = user._doc
            return otherDetails
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Update A User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, password } = req.body;
    try {
        if (_id !== id) {
            return res.status(403).json({ error: "Access Denied! you can only update your own profile" });
        };
        // If user wants to update his/her password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        };

        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res
                .status(404)
                .json({ error: "User does not exists" });
        };
        // JWT Authentication
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" },
        );
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Delete A User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    try {
        if (_id !== id) {
            return res.status(403).json({ error: "Access Denied! you can only Delete your own profile" });
        };

        let user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        };

        user = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Follow a User
export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    try {
        // If user try to follow his/herself
        if (_id == id) {
            return res.status(403).json({ message: "Action Forbidden" });
        };
        const followUser = await UserModel.findById(id);
        const follower = await UserModel.findById(_id);

        // Checking if the user already following
        if (followUser.followers.includes(_id)) {
            return res.status(403).json({ message: "User is already followed by you" });
        };
        await followUser.updateOne({ $push: { followers: _id } });
        await follower.updateOne({ $push: { following: id } });

        res.status(200).json({ Message: "User followed" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UnFollow a User
export const unFollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    try {
        if (_id == id) {
            return res.status(403).json({ message: "Action Forbidden" });
        };
        const followUser = await UserModel.findById(id);
        const follower = await UserModel.findById(_id);

        if (!followUser.followers.includes(_id)) {
            return res.status(403).json({ message: "User is not followed by you" });
        };

        await followUser.updateOne({ $pull: { followers: _id } });
        await follower.updateOne({ $pull: { following: id } });

        res.status(200).json({ Message: "User Unfollowed" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};