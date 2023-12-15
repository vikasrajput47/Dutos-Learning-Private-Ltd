import express from 'express';

import { register,login,logout,getProfile} from '../controllers/user.js';
import { userAuthentication } from '../middleware/isAuthenticated.js';
export const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/getProfile', userAuthentication, getProfile);