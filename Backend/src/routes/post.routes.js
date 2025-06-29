// routes/post.js

import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getPosts", getPosts);

router.get("/getUserPosts", verifyJWT, getUserPosts); // Add this new route

router.get("/getPost", getPostById);

// Upload single image file called 'image' before controller
router.post("/createPost", verifyJWT, upload.single("image"), createPost);
router.put("/updatePost", verifyJWT, upload.single("image") ,updatePost); // also image may be updated
router.delete("/deletePost",  verifyJWT,deletePost );

export default router;
