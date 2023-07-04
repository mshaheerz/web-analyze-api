import express from "express";
import cors from 'cors';
const router = express.Router();

import { register,login,profile,logout,getInsights,getAllInsights,updateInsights, deleteInsights } from "../controllers/mainController.js";
import { userAuth } from "../middlewares/authMidleware.js";

router.post('/login',login)
router.post('/register',register)
router.get('/profile',userAuth,profile)
router.post('/logout',logout)

router.post('/insight',userAuth,getInsights)
router.get('/insight',userAuth,getAllInsights)
router.patch('/insight/:id',userAuth,updateInsights)
router.delete('/insight/:id',userAuth,deleteInsights)


export default router;



