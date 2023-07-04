import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:String
})

const userModel = mongoose.model('users', userSchema);
export default userModel;