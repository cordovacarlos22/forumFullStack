import express from 'express';
import * as userAuth from '../controller/user.auth.controller.js';
import * as userController from '../controller/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isTheSameUser } from '../middlewares/isTheSameUser.js';


const userRoutes = express.Router();

userRoutes.post('/user/register', userAuth.register); // register user
userRoutes.post('/user/login', userAuth.login); // login user 
userRoutes.get('/user', isAuth, isAdmin, userController.getAllUser); // get all user by admin only 
userRoutes.get('/user/:userId', isAuth, userController.getUserById);// get user by id user most by auth
userRoutes.patch('/user/:userId', isAuth, isTheSameUser, userController.updateUserById) // update user by id 
userRoutes.delete('/user/:userId', isAuth,isAdmin, userController.deleteUserById) // update user by id 

export default userRoutes;
