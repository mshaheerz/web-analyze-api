import jwt from "jsonwebtoken";
const jwtsecret = 'hehemysecret'
export function userAuth(req, res, next){
    try {
        const  token = req.headers['usertoken']
     
        if (token) {
            jwt.verify(token, jwtsecret, {}, async (err, user) => {
                if (err) res.json({status:'failed', message:err.message});
                req.userId = user.id
                next();
            })
        } else {
            res.json({status:'failed', message:'user not authenticated'});
        }
    } catch (error) {
        console.log(error.message)
    }
}
