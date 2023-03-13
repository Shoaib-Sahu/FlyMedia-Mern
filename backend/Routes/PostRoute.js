import express from "express";
import {
    creatPost,
    deletePost,
    getPost,
    getTimelinePosts,
    likePost,
    updatePost
} from "../Controllers/PostController.js";
const router = express.Router();

router.post("/new", creatPost)
router.get("/:id", getPost)
router.put("/:id", updatePost)
router.delete("/delete/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)

export default router;