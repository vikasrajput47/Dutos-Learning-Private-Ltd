import express from 'express'
import { userRouter } from './routes/user.js';
import { vendorRouter } from './routes/vendor.js';
import { itemRouter } from './routes/items.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors'
//initallizing the app router
export const app = express();


//setting the path for the env secrets
config({
    path:"./data/config.env"
})


//setting up the cookie parsing and json file rading
//setting the cross origin policy
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


//routes 
app.use('/user', userRouter);
app.use('/vendor',vendorRouter)
app.use('/item', itemRouter);



//random home will be this
app.use('/', (req, res) => {
    res.status(200).json({
        message: ' hi guys'
    })
});

