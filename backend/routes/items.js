import express from 'express'
import { Item } from '../model/items.js';
import { userAuthentication,vendorAuthentication } from '../middleware/isAuthenticated.js';
import { Vendor } from '../model/vender.js';
import { allow ,userItems,allItems,setItems, reject} from '../controllers/items.js';
export const itemRouter = express.Router();

itemRouter.put('/allow/:id',vendorAuthentication,allow)
itemRouter.put('/reject/:id',vendorAuthentication,reject)


itemRouter.get('/get', userAuthentication, userItems);
itemRouter.get('/getAll', vendorAuthentication, allItems);

itemRouter.post('/setItem',userAuthentication, setItems);