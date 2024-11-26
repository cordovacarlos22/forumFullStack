import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import * as commentController from '../controller/comment.controller.js'
// Import routes
const commentRoutes = express.Router();

commentRoutes.post('/comments/post/:postId', commentController.createComment);


export default commentRoutes
