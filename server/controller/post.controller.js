import Post from "../models/post.model.js";
import s3UploadV3 from "../config/s3Service.js";
import Forum from "../models/forum.model.js";


// Create a new post
const createPost = async (req, res) => {
  const { title, content, forumId } = req.body; // Expect `forumId` in the request body

  // Validate required data
  if (!title || !content || !forumId) {
    return res.status(400).json({
      message: "Process failed: Missing required data (title, content, or forumId)",
    });
  }

  // Verify the forum exists
  const forum = await Forum.findById(forumId);
  if (!forum) {
    return res.status(404).json({ message: "Forum not found" });
  }

  try {

    let result;
    let post;

    if (req.files) {
      // Upload files to S3
      result = await s3UploadV3(req.files); // Upload files and get their URLs
    }




    if (result) {
      // Create the post
      post = await Post.create({
        ...req.body,
        image: result.urls, // Store the image URLs
        author: req.userId, // User ID from the authenticated token
      });
    } else {
      // Create the post without images
      post = await Post.create({
        ...req.body,
        author: req.userId, // User ID from the authenticated token
      });
    }

    // Add the post ID to the forum's posts array
    forum.posts.push(post._id);
    await forum.save();

    // Populate the post's author field
    const populatedPost = await Post.findById(post._id)
      .populate("author", "_id firstName lastName") // Populate author details
      .populate('comments', "content");
    res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

const getAllPosts = async (req, res) => {

  try {
    const posts = await Post.find({ isActive: true }).populate("author", "_id firstName lastName ")
      .populate("comments", "content"); // Populate  the id and  name ;
    if (!posts) return res.status(404).json({ message: "No posts were found!, please try again" })

    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getPostById = async (req, res) => {

  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  }

  try {
    const post = await Post.find({ _id: req.params.postId, isActive: true })
      .populate("author", "_id firstName lastName ") // Populate  the id and  name ;
      .populate("comments", "content")
    if (!post) return res.status(404).json({ message: "No post found!, please try again" })
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updatePostById = async (req, res) => {
  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  };
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
      .populate("author", "_id firstName lastName "); // Populate  the id and  name ;
    if (!post) return res.status(404).json({ message: "No post found!, please try again" })
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const deletePostById = async (req, res) => {
  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  };

  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, { isActive: false }, { new: false })
    if (!post || !post.isActive) {
      return res.status(404).json({ message: 'Post not found' })
    };
    return res.status(204).end()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
}
