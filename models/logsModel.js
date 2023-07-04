import mongoose from 'mongoose';
const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    domain: String,
    fav: { type: Boolean, default: false },
    webLinks: Array,
    mediaLinks: Array,
    wordCount:Number,
},
    {
        timestamps: true,
    }
);

const logModel = mongoose.model('logs', logSchema);
export default logModel;