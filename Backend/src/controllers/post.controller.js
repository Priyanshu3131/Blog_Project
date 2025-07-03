// controllers/postController.js

import {Post} from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// CREATE
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if ([title, content].some(field => !field?.trim())) {
    throw new ApiError(400, "Title and Content are required");
  }

  let imageUrl = "";

  if (req.file?.path) {
    const result = await uploadOnCloudinary(req.file.path);
    imageUrl = result?.secure_url;
  }

  const post = await Post.create({
    title,
    content,
    imageUrl,
    userId: req.user._id,
  });

  if (!post) {
    throw new ApiError(500, "Post creation failed");
  }

  return res.status(201).json(
    new ApiResponse(201, post, "Post created successfully")
  );
});

// READ ALL
// export const getPosts = asyncHandler(async (req, res) => {
//   const posts = await Post.find().sort({ createdAt: -1 });
//   return res
//     .status(200)
//     .json(new ApiResponse(200, posts, "Posts fetched successfully"));
// });
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'username'); // 👈 populate username only

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

// *************************************READ USER'S POSTS ONLY (NEW ADDITION) ********************************************
export const getUserPosts = asyncHandler(async (req, res) => {
  //const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
  const posts = await Post.find({ userId: req.user._id })
  .sort({ createdAt: -1 })
  .populate('userId', 'username');
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "User posts fetched successfully"));
});

// READ ONE
// export const getPostById = asyncHandler(async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     throw new ApiError(404, "Post not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, post, "Post retrieved successfully"));
// });
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.query.id); // ✅ changed from req.params.id

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

// UPDATE
export const updatePost = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.id);
  const post = await Post.findById(req.query.id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this post");
  }

  const { title, content } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;

  if (req.file?.path) {
    const result = await uploadOnCloudinary(req.file.path);
    post.imageUrl = result?.secure_url;
  }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// DELETE
export const deletePost = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.id);
  const post = await Post.findById(req.query.id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});
