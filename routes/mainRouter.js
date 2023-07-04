import express from "express";
const router = express.Router();

import { register,login,profile,logout,getInsights,getAllInsights,updateInsights, deleteInsights } from "../controllers/mainController.js";
import { userAuth } from "../middlewares/authMidleware.js";

//authentication routes
router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)

//protected routes
router.get('/profile',userAuth,profile)

router.get('/insight',userAuth,getAllInsights)    
router.post('/insight',userAuth,getInsights)
router.patch('/insight/:id',userAuth,updateInsights)
router.delete('/insight/:id',userAuth,deleteInsights)


export default router;



