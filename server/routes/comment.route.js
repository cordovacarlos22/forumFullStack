import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import * as commentController from '../controller/comment.controller.js'
// Import routes
const commentRoutes = express.Router();

commentRoutes.post('/comments/post/:postId', isAuth, commentController.createComment);

// Get all comments for a post
commentRoutes.get('/comments', commentController.getAllComments);
// commentRoutes.get('/comments/post/:postId', commentController.getAllCommentsByPost);
// update comments is auth y is the  same user
// delete comments is auth y is the same user


export default commentRoutes
