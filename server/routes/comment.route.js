import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { isTheSameUser } from '../middlewares/isTheSameUser.js'
import * as commentController from '../controller/comment.controller.js'
// Import routes
const commentRoutes = express.Router();

commentRoutes.post('/comments/post/:postId', isAuth, commentController.createComment);

// Get all comments for a post
commentRoutes.get('/comments', commentController.getAllComments);

// Get all comments for a specific post
commentRoutes.get('/comments/post/:postId', commentController.getAllCommentsByPost);
// update comments is auth y is the  same user
commentRoutes.patch('/comments/post/:postId', isTheSameUser, commentController.updateCommentsByPostId);

// delete comments is auth y is the same user
commentRoutes.delete('/comments/:commentId', isTheSameUser, commentController.deleteCommentById);


export default commentRoutes
