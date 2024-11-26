import Post from "../models/post.model.js";
import s3UploadV3 from "../config/s3Service.js";

// Create a new post
const createPost = async (req, res) => {

  // Validate that user provides with the required information
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json('Process failed: Incomplete data')
  }

  if (!req.files) {

    return res.status(400).json({ message: 'No file uploaded' });
  };

  try {
    const result = await s3UploadV3(req.files); // function takes files and uploads them to s3 


    const post = await Post.create({
      ...req.body,
      image: result.urls, // Guarda las URLs en el campo `image`
      author: req.userId, // Obtener ID del usuario desde el token
    });


    // Populate the author field with user details
    const populatedPost = await Post.findById(post._id)
      .populate("author", "_id firstName lastName "); // Populate  the id and  name 


    res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

const getAllPosts = async (req, res) => {

  try {
    const posts = await Post.find({ isActive: true }).populate("author", "_id firstName lastName "); // Populate  the id and  name ;
    if (!posts) return res.status(404).json({ message: "No posts were found!, please try again" })

    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getPostById = async (req, res) => {

  // Valido que el ID sea un ObjectID de MongoDB (24 caracteres alfanuméricos en hexadecimal)
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  }

  try {
    const post = await Post.find({ _id: req.params.postId, isActive: true })
      .populate("author", "_id firstName lastName "); // Populate  the id and  name ;
    if (!post) return res.status(404).json({ message: "No post found!, please try again" })
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updatePostById = async (req, res) => {
  try {

  } catch (error) {

  }
};

const deletePostById = async (req, res) => {
  try {

  } catch (error) {

  }
};

export {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
}
