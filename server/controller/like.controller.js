import Like from "../models/like.model.js";
import Post from "../models/post.model.js";
const toggleLike = async (req, res) => {
  const { postId } = req.params;

  // Validate the postId
  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId: req.userId });

    if (existingLike) {
      // If the like exists, remove it
      await Like.deleteOne({ _id: existingLike._id });

      // Remove the like from the post's likes array
      post.likes = post.likes.filter((likeId) => !likeId.equals(existingLike._id));
      await post.save();

      return res.status(200).json({
        message: "Like removed successfully",
        liked: false,
      });
    }

    // If the like does not exist, create it
    const like = await Like.create({
      postId,
      userId: req.userId,
    });

    // Add the like ID to the post's likes array
    post.likes.push(like._id);
    await post.save();

    const populatedLike = await Like.findById(like._id).populate("userId", "_id firstName lastName");

    res.status(201).json({
      message: "Like added successfully",
      liked: true,
      like: populatedLike,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
};

export {
  toggleLike,

}