import postModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";

// Creat New Post
export const creatPost = async (req, res) => {
    try {
        const post = await postModel.create(req.body);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get A Post 
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        };
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update A Post 
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        let post = await postModel.findById(postId);
        // Checking if the user is only updating his/her own post
        if (post.userId === userId) {
            post = await postModel.findByIdAndUpdate(postId,
                req.body,
                { new: true }
            );
            res.status(200).json({ message: "Post updated successfully", post });
        } else {
            res.status(403).json({ error: "Action Forbidden" });
        };
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete A post 
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        let post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        };

        // Checking if the user is only deleting his/her own post
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json({ error: "Action forbidden" });
        };
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like & Dislike A Post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(id);
        // Checking if post is already liked or disliked
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post liked" });
        }
        else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post disliked" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const currentUserPosts = await postModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res
            .status(200)
            .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
            );
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};