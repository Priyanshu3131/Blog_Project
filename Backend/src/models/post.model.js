// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    content: { 
        type: String, 
        required: true 
    },
    imageUrl: {
        type: String 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true } 
);

export const Post=mongoose.model("Post", postSchema);
