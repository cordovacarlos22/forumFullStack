import express from 'express';
import * as userAuth from '../controller/user.auth.controller.js';
import * as userController from '../controller/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isTheSameUser } from '../middlewares/isTheSameUser.js';


const userRoutes = express.Router();

userRoutes.post('/user/register', userAuth.register); // register user
userRoutes.post('/user/login', userAuth.login); // login user 
userRoutes.get('/user',isAuth, userController.getAllUser); /* HECTOR --  desprotegi la ruta pero condicione la peticion del controlador para dar una respuesta si eres admin o user */
userRoutes.get('/user/:userId',isAuth, userController.getUserById); /* HECTOR --  desprotegi la ruta pero condicione la peticion del controlador para dar una respuesta si eres admin o user */
userRoutes.patch('/user/:userId', isAuth, isTheSameUser, userController.updateUserById) // update user by id 
userRoutes.delete('/user/:userId', isAuth, isTheSameUser, userController.deleteUserById) // delete user by id 

export default userRoutes;
