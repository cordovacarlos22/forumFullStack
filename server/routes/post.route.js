import express from 'express'
import * as postController from '../controller/post.controller.js'
import { isAuth } from '../middlewares/isAuth.js';
import { uploadFiles,multerErrorHandler } from '../middlewares/multerUploadFile.midleware.js';
const postRoute = express.Router();

// create a post with auth validation middleware  to get user id 
postRoute.post('/post', isAuth, multerErrorHandler(uploadFiles), postController.createPost);

// get all posts
postRoute.get('/post', postController.getAllPosts);


export default postRoute