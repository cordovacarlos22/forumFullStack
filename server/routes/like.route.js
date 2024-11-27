import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import * as likeController from '../controller/like.controller.js';

const likeRoute = express.Router();

likeRoute.post("/posts/:postId/like", isAuth, likeController.toggleLike);

export default likeRoute;