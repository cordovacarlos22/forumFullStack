import express from 'express';
import * as forumController from '../controller/forum.controller.js'
const forumRoutes = express.Router();



// create a new forum with title, description and posts array
forumRoutes.post('/forum', forumController.createForum);

// get all forums
forumRoutes.get('/forum', forumController.getAllForums);

// get forum by id
forumRoutes.get('/forum/:forumId', forumController.getForumById);

// update forum by id with auth validation middleware
forumRoutes.patch('/forum/:forumId', forumController.updateForumById);

// delete forum by id with auth validation middleware
forumRoutes.delete('/forum/:forumId', forumController.deleteForumById);

export default forumRoutes;