import express from "express";
import { connectDB } from "./config/dbConnection.js";
import mainRouter from './routes/mainRouter.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const PORT= 3000;
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173'}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));
connectDB()

app.use('/',mainRouter)



app.listen(PORT,()=>console.log(`listening on port ${PORT}`))