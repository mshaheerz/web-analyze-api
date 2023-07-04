
import userModel from "../models/userModel.js";
import { compareSync, hashSync,genSaltSync } from "bcrypt";
const bcryptSalt = genSaltSync(10)
import logModel from "../models/logsModel.js";
import jwt from "jsonwebtoken";
const jwtsecret = 'hehemysecret'
import { getWebLinks,countWords,getMediaLinks } from "../helpers/mainHelper.js";


// -------------------> user login <------------------------ //
export async function login(req, res){

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
         console.log(req.body)
            const passOk = compareSync(password, user.password)
            console.log(passOk)
            if (passOk) {
                jwt.sign({id: user._id}, jwtsecret, { expiresIn: '1d' }, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({status:'success', message:'user login success',user})
                })

            } else {
                res.json({ 'status': 'failed', message:'Invalid password' })
            }

        } else {
            res.json({status:'failed', message:'user not exist'})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status:'failed', message:'internal server error'})
    }

}


// -------------------> user register <------------------------ //
export async function register(req, res){
    try {
        const { email, password } = req.body;

        const user = await userModel.create({
            email, password: hashSync(password, bcryptSalt)
        })
        res.status(200).json({status:'success', message:'user successfully created',user});
    } catch (error) {
        res.json({status:'failed', message:'failed to register'})
    }
}


// -------------------> fetch user details <------------------------ //
export async function profile(req,res){
    try {
        const {email, _id} = await userModel.findById(req.userId)
        res.status(200).json({email,id:_id})
    } catch (error) {
        console.log(error.message)
        res.json({status:'failed', message:'internal server error'})
    }
}

// -------------------> logout user <------------------------ //

export function logout(req,res){
    res.cookie('token', '').json(true)
}


//

export async function getInsights(req, res){
    try {
        const {url}= req.body
        const webLinks = await getWebLinks(url)
        const mediaLinks = await getMediaLinks(url)
        const wordCounts = await countWords(url)
        const isLog = await logModel.findOne({domain:url})
        if(isLog){
            await logModel.findByIdAndUpdate(isLog._id,{
                webLinks:webLinks,
                mediaLinks:mediaLinks,
                wordCount:wordCounts
            })
        }else {
            await logModel.create({
                user:req.userId,
                domain:url,
                webLinks:webLinks,
                mediaLinks:mediaLinks,
                wordCount:wordCounts
            })
        }

        const logs = await logModel.find({user:req.userId});

        res.json({status:'success', logs})
    } catch (error) {
        console.log(error.message)
    }
}

export async function getAllInsights(req, res){
    try {
        const logs = await logModel.find({user:req.userId}).sort({updatedAt:-1})
        res.json({status:'success', logs})
    } catch (error) {
        
    }
}

export async function updateInsights(req, res) {
    try {
        const fav = req.body.fav
        const id= req.params.id
        await logModel.findOneAndUpdate({_id:id},{fav:fav})
        return res.status(200).json({status:'success'})
    } catch (error) {
        
    }
} 


export async function deleteInsights(req,res){
    try {
        const id= req.params.id
        await logModel.findByIdAndDelete(id)
        return res.status(200).json({status:'success'})
    } catch (error) {
        
    }
}