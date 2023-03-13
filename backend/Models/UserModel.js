import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter Your Username"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password "],
            minLength: [6, "Password should have atleast 6 characters"]
        },
        firstname: {
            type: String,
            required: [true, "Please Enter Your Firstname"]
        },
        lastname: {
            type: String,
            required: [true, "Please Enter Your Lastname"]
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        country: String,
        relationship: String,
        followers: [],
        following: [],
    },
    {
        timestamps: true
    },
);

// Generating Hash Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    };
    this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;