import express from 'express';

import * as userController from '../controller/user.controller.js';

import * as userAuth from '../controller/user.auth.controller.js';

const userRoutes = express.Router();

userRoutes.post('/register', userAuth.register)
userRoutes.post('/login', userAuth.login)

export default userRoutes;
