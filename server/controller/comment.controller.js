import Comment from "../models/commet.model.js";

/// create a comment
const createComment = async (req, res) => {
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const { postId } = req.params;
  const { content } = req.body;
  try {
    // Check if a comment for the postId already exists
    let comment = await Comment.findOne({ postId });

    if (comment) {
      // If a comment exists, append the new content to the content array
      comment.content.push(content);
      await comment.save();

      return res.status(200).json({
        message: "Comment updated successfully",
        comment,
      });
    }

    // If no comment exists, create a new one
    comment = await Comment.create({
      postId,
      userId: req.userId, // User's ID from the authentication middleware
      content: [content], // Initialize the content array
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("postId", "_id title content ")
      .populate("userId", "_id firstName lastName")


    res.status(200).json({ message: "Comment added successfully", populatedComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
};


export {
  createComment,
  
}