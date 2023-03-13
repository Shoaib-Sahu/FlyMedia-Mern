import express from 'express';
import {
    deleteUser,
    followUser,
    getAllUsers,
    getUser,
    unFollowUser,
    updateUser
} from '../Controllers/UserController.js';
const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unFollowUser);

export default router;