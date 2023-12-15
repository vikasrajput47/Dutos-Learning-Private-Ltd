import express from 'express'
import { register,login,logout } from '../controllers/vendor.js';


export const vendorRouter = express.Router();

vendorRouter.post('/register', register);
vendorRouter.post('/login', login);
vendorRouter.get('/logout', logout);