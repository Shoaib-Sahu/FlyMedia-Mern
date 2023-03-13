import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: String,
        likes: [],
        createdAt: {
            type: Date,
            default: new Date(),
        },
        image: String,
    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;