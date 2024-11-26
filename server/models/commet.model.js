import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true, unique: true }, // Reference to the post
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who made the comment
    content: [{ type: String, required: true }], // Content of the comment
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;