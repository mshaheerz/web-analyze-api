import express from "express";
import { connectDB } from "./config/dbConnection.js";
import mainRouter from './routes/mainRouter.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const PORT= 3000;

//middlewares
app.use(cors({ credentials: true, origin: 'https://web-analyze-client.vercel.app'}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));

//Database connection
connectDB()

//routes 
app.use('/',mainRouter)



app.listen(PORT,()=>console.log(`listening on port ${PORT}`))
